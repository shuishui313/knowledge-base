"""Role-filtered hybrid retrieval: BM25 always, embeddings when configured.

The role filter runs before ranking. Each role gets its own BM25 index built
only from the chunks that role may see, so a hidden document cannot influence
the ranking or even the IDF statistics of what the role does see.
"""

from __future__ import annotations

import hashlib
import json
import math
import re
from dataclasses import dataclass
from pathlib import Path

from rank_bm25 import BM25Okapi

from .corpus import Chunk

STOPWORDS = set("""
a about above after again against all am an and any are as at be because been
before being below between both but by can could did do does doing down during
each few for from further had has have having he her here hers him his how i if
in into is it its itself just me more most my myself no nor not now of off on
once only or other our out over own same she should so some such than that the
their them then there these they this those through to too under until up very
was we were what when where which while who whom why will with would you your
yours shall may might must also etc per via eg ie
""".split())

# Words that appear in almost every question about this corpus. They are kept
# for BM25 scoring but ignored when measuring how much of the question the
# evidence covers, otherwise "Hong Kong" alone would look like a match.
DOMAIN_STOPWORDS = {"hong", "kong", "hk", "hksar", "get", "need", "want", "tell",
                    "know", "much", "many", "long", "please", "allowed", "able"}

_TOKEN = re.compile(r"[a-z0-9$]+(?:[.'][a-z0-9]+)*")


def _stem(word: str) -> str:
    if len(word) > 4 and word.endswith("ies"):
        return word[:-3] + "y"
    if len(word) > 4 and word.endswith(("ses", "xes", "ches", "shes")):
        return word[:-2]
    if len(word) > 3 and word.endswith("s") and not word.endswith(("ss", "us", "is")):
        return word[:-1]
    return word


def tokenize(text: str) -> list[str]:
    tokens = []
    for raw in _TOKEN.findall(text.lower().replace("’", "'")):
        raw = raw.replace("'s", "")
        if raw in STOPWORDS:
            continue
        tokens.append(_stem(raw))
    return tokens


def content_terms(question: str) -> set[str]:
    return {t for t in tokenize(question) if t not in DOMAIN_STOPWORDS and len(t) > 1}


@dataclass
class Hit:
    chunk: Chunk
    score: float          # fused score used for ordering
    bm25: float           # raw BM25 score (0 if only found by embeddings)
    cosine: float | None  # embedding similarity, when embeddings are on
    coverage: float       # share of the question's content words found in this chunk


class UnknownRole(ValueError):
    pass


class Retriever:
    def __init__(self, chunks: list[Chunk], roles: list[str], embedder: "Embedder | None" = None):
        self.chunks = chunks
        self.roles = set(roles)
        self.embedder = embedder
        self._tokens = [tokenize(c.search_text) for c in chunks]
        self._token_sets = [set(t) for t in self._tokens]
        self._by_role: dict[str, tuple[list[int], BM25Okapi]] = {}
        self._vectors: list[list[float]] | None = None
        if embedder is not None:
            self._vectors = embedder.embed_chunks(chunks)

    def allowed(self, role: str) -> list[int]:
        if role not in self.roles:
            raise UnknownRole(role)
        return [i for i, c in enumerate(self.chunks) if role in c.audience]

    def _index(self, role: str) -> tuple[list[int], BM25Okapi | None]:
        if role not in self._by_role:
            ids = self.allowed(role)
            bm25 = BM25Okapi([self._tokens[i] for i in ids]) if ids else None
            self._by_role[role] = (ids, bm25)
        return self._by_role[role]

    def search(self, question: str, role: str, k: int = 4) -> list[Hit]:
        ids, bm25 = self._index(role)
        if not ids or bm25 is None:
            return []
        q_tokens = tokenize(question)
        terms = content_terms(question)
        bm25_scores = bm25.get_scores(q_tokens) if q_tokens else [0.0] * len(ids)
        bm25_by_chunk = {ids[j]: float(s) for j, s in enumerate(bm25_scores)}

        bm25_rank = sorted(ids, key=lambda i: bm25_by_chunk[i], reverse=True)
        bm25_rank = [i for i in bm25_rank if bm25_by_chunk[i] > 0]

        cos_by_chunk: dict[int, float] = {}
        if self.embedder is not None and self._vectors is not None:
            qv = self.embedder.embed_query(question)
            cos_by_chunk = {i: _cosine(qv, self._vectors[i]) for i in ids}
            cos_rank = sorted(ids, key=lambda i: cos_by_chunk[i], reverse=True)
            fused = _rrf([bm25_rank[:50], cos_rank[:50]])
        else:
            fused = {i: bm25_by_chunk[i] for i in bm25_rank}

        order = sorted(fused, key=lambda i: fused[i], reverse=True)[:k]
        hits = []
        for i in order:
            cov = len(terms & self._token_sets[i]) / len(terms) if terms else 0.0
            hits.append(Hit(self.chunks[i], fused[i], bm25_by_chunk.get(i, 0.0),
                            cos_by_chunk.get(i), cov))
        return hits


def _rrf(rankings: list[list[int]], k: int = 60) -> dict[int, float]:
    """Reciprocal rank fusion: robust to the two scores being on different scales."""
    fused: dict[int, float] = {}
    for ranking in rankings:
        for rank, i in enumerate(ranking):
            fused[i] = fused.get(i, 0.0) + 1.0 / (k + rank + 1)
    return fused


def _cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x * x for x in a))
    nb = math.sqrt(sum(y * y for y in b))
    return dot / (na * nb) if na and nb else 0.0


class Embedder:
    """OpenAI-compatible /embeddings client with an on-disk cache keyed by text hash."""

    def __init__(self, base_url: str, api_key: str, model: str, cache_dir: Path, client=None):
        import httpx

        self.base_url = base_url
        self.model = model
        self.cache_path = cache_dir / f"embeddings-{re.sub(r'[^a-z0-9]+', '-', model.lower())}.json"
        self.client = client or httpx.Client(timeout=60, headers={"Authorization": f"Bearer {api_key}"})
        self._cache: dict[str, list[float]] = {}
        if self.cache_path.exists():
            self._cache = json.loads(self.cache_path.read_text())

    def _embed(self, texts: list[str]) -> list[list[float]]:
        resp = self.client.post(f"{self.base_url}/embeddings", json={"model": self.model, "input": texts})
        resp.raise_for_status()
        data = sorted(resp.json()["data"], key=lambda d: d["index"])
        return [d["embedding"] for d in data]

    def embed_chunks(self, chunks: list[Chunk]) -> list[list[float]]:
        keys = [hashlib.sha256(c.search_text.encode()).hexdigest() for c in chunks]
        missing = [(k, c.search_text) for k, c in zip(keys, chunks) if k not in self._cache]
        for start in range(0, len(missing), 64):
            batch = missing[start:start + 64]
            for (key, _), vec in zip(batch, self._embed([t for _, t in batch])):
                self._cache[key] = vec
        if missing:
            self.cache_path.parent.mkdir(parents=True, exist_ok=True)
            self.cache_path.write_text(json.dumps(self._cache))
        return [self._cache[k] for k in keys]

    def embed_query(self, question: str) -> list[float]:
        return self._embed([question])[0]
