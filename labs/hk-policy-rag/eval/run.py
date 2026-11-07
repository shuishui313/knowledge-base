"""Offline evaluation: retrieval hit@3 and refusal behaviour.

Run: python -m eval.run   (add --json for machine-readable output)
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from app.answer import Assistant

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    items = [json.loads(l) for l in (ROOT / "data/eval/questions.jsonl").read_text().splitlines() if l.strip()]
    a = Assistant()
    hit = n_ans = refused_ok = n_out = false_refusals = 0
    rows = []
    for it in items:
        hits = a.retriever.search(it["question"], it["role"], k=3)
        ans = a.ask(it["question"], it["role"])
        top_docs = [h.chunk.doc_id for h in hits]
        if it["answerable"]:
            n_ans += 1
            ok = it["expected_source"] in top_docs
            hit += ok
            false_refusals += ans.refused
            status = ("hit" if ok else "MISS") + (" REFUSED" if ans.refused else "")
        else:
            n_out += 1
            refused_ok += ans.refused
            status = "refused" if ans.refused else "ANSWERED"
        rows.append((it["id"], it["role"], status, ",".join(top_docs)))
    for r in rows:
        print(f"{r[0]:4} {r[1]:12} {r[2]:14} {r[3]}")
    print()
    print(f"hit@3 on answerable:        {hit}/{n_ans} = {hit / n_ans:.0%}")
    print(f"false refusals:             {false_refusals}/{n_ans}")
    print(f"correct out-of-scope refuse:{refused_ok}/{n_out} = {refused_ok / n_out:.0%}")
    if "--json" in sys.argv:
        print(json.dumps(dict(hit_at_3=hit / n_ans, false_refusals=false_refusals, refusal_rate=refused_ok / n_out)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
