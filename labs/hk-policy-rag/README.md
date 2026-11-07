# HK Policy RAG

A question-answering service over public Hong Kong Immigration Department guidance. It answers only with quoted, cited text, refuses when the pages don't cover the question, and filters documents by user role before ranking.

```bash
pip install -r requirements.txt
python -m pytest -q        # 5 passed
python -m eval.run         # hit@3 13/14, out-of-scope refusals 6/6
uvicorn app.api:app        # POST /ask, GET /healthz
```

Runs fully offline. An OpenAI-compatible API key is optional.

## Results

Measured offline (BM25 only, no API key) on 20 hand-written questions in `data/eval/questions.jsonl`:

| Metric | Result |
|---|---|
| Right page in top 3 (14 answerable questions) | 13/14 (93%) |
| False refusals on answerable questions | 0/14 |
| Correct refusals on out-of-scope questions | 6/6 |

The one miss: "How long does the Immigration Department take to process a GEP application?" ranks TechTAS, QMAS and TTPS first, and the gate still lets it through, so it answers from the wrong page. Rephrased as "processing time for a GEP application" it lands on the GEP page. Gate thresholds were set by hand against this same small set, so treat the numbers as a sanity check, not a benchmark.

## How it works

```
question + role
   │
   ▼
role filter ── only chunks whose audience includes the role (separate BM25 index per role)
   │
   ▼
BM25 (+ optional embeddings, merged with reciprocal rank fusion)
   │
   ▼
evidence gate ── top BM25 score and share of question words covered
   │        └── fails → refuse, point to the live ImmD site
   ▼
answer ── no key: quote the best sentences with [n] citations
          with key: model answers from the given chunks only, as JSON;
                    reply without citations or with unknown ones → refuse;
                    model error → fall back to quotes
```

```bash
curl -s localhost:8000/ask -H 'content-type: application/json' \
  -d '{"question": "When can non-local students take summer jobs?", "role": "student"}'
```

Response fields: `answer`, `citations[]` (page, section, URL, snapshot date, quote), `refused`, `mode`, `reason`.

## Design choices

- **Filter before ranking.** Each role gets its own index, so pages a role can't see don't even shape term statistics. Filtering after ranking can leak through scores, snippets or caches.
- **Hybrid retrieval.** Scheme names and numbers (IANG, TTPS, HK$2.5 million) are exact tokens where BM25 is strong. Embeddings help with paraphrases; they're optional so the demo needs no key.
- **Refuse rather than guess.** For immigration rules, a wrong answer costs more than no answer. The gate is crude (lexical) but cheap and explainable.
- **Chunks never cross a heading.** About 180 words per chunk, split at section boundaries, with the page title and section indexed alongside the text so a question that names a scheme finds that scheme's page.
- **Quotes over paraphrase by default.** Staff can paste them into emails and the wording stays official.

## Data and licence

`data/corpus/` holds a snapshot of 10 ImmD pages fetched on 2026-11-07 (`scripts/fetch_corpus.py`, sources in `config/sources.json`). Each file records its source URL and fetch date. ImmD permits non-commercial reproduction with acknowledgement: https://www.immd.gov.hk/eng/important-notices.html. Labour Department pages were left out because they require prior written permission to republish. Nothing here is legal advice.

The roles in `config/roles.json` are a demo split, not an ImmD classification.

## Limitations

- English only. Chinese questions won't match the English BM25 index.
- The gate is lexical, so it can pass a question that shares words with the wrong page (see the miss above).
- The model and embedding paths are written but haven't been tested against a live endpoint.
- No auth: `role` is trusted from the request. In production it would come from the user's session.

## What I'd do next at a real client

1. Sit with the careers office for a day and collect 100 real questions to replace my 20.
2. Add a cross-encoder reranker and a scheme-name router to fix wrong-page answers.
3. Add Traditional Chinese pages and a multilingual embedding model.
4. Log every question, answer and citation, and review a weekly sample with a caseworker.
5. Re-fetch on a schedule and alert when a page changes.

[中文说明](README.zh.md) · [Scope](docs/SCOPE.md)
