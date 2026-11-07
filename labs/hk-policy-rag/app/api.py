"""HTTP service: POST /ask and GET /healthz."""

from __future__ import annotations

from functools import lru_cache

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .answer import Assistant
from .retrieval import UnknownRole

app = FastAPI(title="HK Policy RAG", version="0.1.0")


class AskRequest(BaseModel):
    question: str = Field(min_length=3, max_length=500)
    role: str


@lru_cache(maxsize=1)
def assistant() -> Assistant:
    return Assistant()


@app.get("/healthz")
def healthz() -> dict:
    a = assistant()
    return {"status": "ok", "chunks": len(a.chunks), "roles": a.roles,
            "mode": "llm" if a.settings.llm_enabled else "extractive"}


@app.post("/ask")
def ask(req: AskRequest) -> dict:
    a = assistant()
    if req.role not in a.roles:
        raise HTTPException(status_code=400, detail=f"unknown role; use one of {a.roles}")
    try:
        ans = a.ask(req.question, req.role)
    except UnknownRole as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return ans.to_dict()
