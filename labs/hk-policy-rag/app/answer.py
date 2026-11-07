"""Turn retrieved chunks into an answer, or refuse.

Two answerers share one evidence gate:

* extractive (default, no key needed): quotes the best sentences from the top
  chunks, each with a numbered citation.
* llm (when OPENAI_API_KEY is set): asks an OpenAI-compatible chat model to
  answer only from the numbered chunks, cite them, and refuse otherwise. The
  reply is checked: an answer that cites nothing, or cites a chunk that was
  not supplied, is turned into a refusal.
"""

from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass, field

from .config import Settings
from .corpus import load_chunks
from .retrieval import Embedder, Hit, Retriever, content_terms, tokenize

REFUSAL = (
    "I can't answer that from the Immigration Department pages available to your role. "
    "Please check the live page at https://www.immd.gov.hk or ask a caseworker."
)
DISCLAIMER = "Quoted from the Immigration Department pages listed below (snapshot dated {fetched}). This is not legal advice; check the live page before acting."


@dataclass
class Citation:
    n: int
    chunk_id: str
    doc_id: str
    title: str
    section: str
    source_url: str
    fetched: str
    quote: str


@dataclass
class Answer:
    answer: str
    citations: list[Citation] = field(default_factory=list)
    refused: bool = False
    mode: str = "extractive"
    reason: str = ""

    def to_dict(self) -> dict:
        return asdict(self)


def evidence_ok(hits: list[Hit], s: Settings) -> tuple[bool, str]:
    if not hits:
        return False, "no chunk matched any question word"
    for h in hits:
        if h.bm25 >= s.min_score and h.coverage >= s.min_coverage:
            return True, ""
        if h.cosine is not None and h.cosine >= s.min_cosine:
            return True, ""
    best = max(hits, key=lambda h: h.coverage)
    return False, (f"weak evidence: best coverage {best.coverage:.2f} (need {s.min_coverage}), "
                   f"top BM25 {max(h.bm25 for h in hits):.1f} (need {s.min_score})")


_SENTENCE = re.compile(r"(?<=[.;:])\s+|\n+")


def _best_sentences(text: str, terms: set[str], limit: int = 2) -> str:
    sentences = [s.strip(" -") for s in _SENTENCE.split(text) if len(s.split()) >= 4]
    if not sentences:
        return text.strip()
    scored = [(len(terms & set(tokenize(s))), -i, s) for i, s in enumerate(sentences)]
    best = sorted(scored, reverse=True)[:limit]
    best = [b for b in best if b[0] > 0] or best[:1]
    # Keep page order so the quote reads naturally.
    return " ... ".join(s for _, _, s in sorted(best, key=lambda b: -b[1]))


def extractive_answer(question: str, hits: list[Hit], max_sources: int = 3) -> Answer:
    terms = content_terms(question)
    useful = [h for h in hits if h.coverage > 0][:max_sources] or hits[:1]
    citations, lines = [], []
    for n, h in enumerate(useful, start=1):
        quote = _best_sentences(h.chunk.text, terms)
        citations.append(_citation(n, h, quote))
        lines.append(f'- "{quote}" [{n}]')
    fetched = min(c.fetched for c in citations)
    text = DISCLAIMER.format(fetched=fetched) + "\n" + "\n".join(lines)
    return Answer(answer=text, citations=citations, refused=False, mode="extractive")


def _citation(n: int, h: Hit, quote: str) -> Citation:
    c = h.chunk
    return Citation(n, c.id, c.doc_id, c.title, c.section, c.source_url, c.fetched, quote)


SYSTEM_PROMPT = """You answer questions about Hong Kong immigration guidance.
Use ONLY the numbered sources supplied. Do not use outside knowledge.
Cite every claim with the source number in square brackets, e.g. [2].
If the sources do not clearly answer the question, refuse: set "refused" to true and leave "answer" empty.
Do not guess numbers, fees, dates or eligibility rules that are not in the sources.
Reply with a JSON object only: {"answer": string, "used": [source numbers], "refused": boolean}."""


def llm_answer(question: str, hits: list[Hit], s: Settings, client=None) -> Answer:
    import httpx

    sources = "\n\n".join(
        f"[{n}] {h.chunk.title} / {h.chunk.section}\n{h.chunk.text}" for n, h in enumerate(hits, start=1)
    )
    payload = {
        "model": s.chat_model,
        "temperature": 0,
        "response_format": {"type": "json_object"},
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Sources:\n{sources}\n\nQuestion: {question}"},
        ],
    }
    own_client = client is None
    client = client or httpx.Client(timeout=60, headers={"Authorization": f"Bearer {s.api_key}"})
    try:
        resp = client.post(f"{s.base_url}/chat/completions", json=payload)
        resp.raise_for_status()
        content = resp.json()["choices"][0]["message"]["content"]
    finally:
        if own_client:
            client.close()
    return parse_llm_reply(content, hits)


def parse_llm_reply(content: str, hits: list[Hit]) -> Answer:
    match = re.search(r"\{.*\}", content, re.S)
    try:
        data = json.loads(match.group(0) if match else content)
    except (json.JSONDecodeError, AttributeError):
        return Answer(REFUSAL, refused=True, mode="llm", reason="model reply was not valid JSON")
    if data.get("refused") or not str(data.get("answer", "")).strip():
        return Answer(REFUSAL, refused=True, mode="llm", reason="model said the sources were insufficient")
    text = str(data["answer"]).strip()
    cited = {int(n) for n in re.findall(r"\[(\d+)\]", text)}
    cited |= {int(n) for n in data.get("used", []) if str(n).isdigit()}
    if not cited:
        return Answer(REFUSAL, refused=True, mode="llm", reason="model answer had no citations")
    if any(n < 1 or n > len(hits) for n in cited):
        return Answer(REFUSAL, refused=True, mode="llm", reason="model cited a source it was not given")
    citations = [_citation(n, hits[n - 1], hits[n - 1].chunk.text[:300]) for n in sorted(cited)]
    return Answer(text, citations, refused=False, mode="llm")


class Assistant:
    def __init__(self, settings: Settings | None = None, embedder: Embedder | None = None):
        self.settings = s = settings or Settings()
        roles = json.loads(s.roles_file.read_text(encoding="utf-8"))["roles"]
        self.roles = sorted(roles)
        if embedder is None and s.embeddings_enabled:
            embedder = Embedder(s.base_url, s.api_key, s.embed_model, s.cache_dir)
        self.chunks = load_chunks(s.corpus_dir, s.chunk_words)
        self.retriever = Retriever(self.chunks, self.roles, embedder)

    def ask(self, question: str, role: str) -> Answer:
        s = self.settings
        hits = self.retriever.search(question, role, k=s.top_k)
        ok, why = evidence_ok(hits, s)
        if not ok:
            return Answer(REFUSAL, refused=True, mode="gate", reason=why)
        if s.llm_enabled:
            try:
                return llm_answer(question, hits, s)
            except Exception as exc:  # network, auth, quota: degrade, don't fail the request
                ans = extractive_answer(question, hits)
                ans.mode, ans.reason = "extractive-fallback", f"LLM call failed: {type(exc).__name__}"
                return ans
        return extractive_answer(question, hits)
