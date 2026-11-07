"""Settings, read once from the environment. Everything has an offline default."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def _env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


@dataclass(frozen=True)
class Settings:
    corpus_dir: Path = field(default_factory=lambda: Path(_env("RAG_CORPUS_DIR", str(ROOT / "data" / "corpus"))))
    roles_file: Path = ROOT / "config" / "roles.json"
    cache_dir: Path = field(default_factory=lambda: Path(_env("RAG_CACHE_DIR", str(ROOT / ".cache"))))

    # Chunking
    chunk_words: int = 180

    # Retrieval
    top_k: int = field(default_factory=lambda: int(_env("RAG_TOP_K", "4")))
    # Refusal gate. A question is answered only if the best chunk scores at
    # least min_score (BM25) and covers at least min_coverage of the
    # question's content words. See README "Why refuse".
    min_score: float = field(default_factory=lambda: float(_env("RAG_MIN_SCORE", "6.0")))
    min_coverage: float = field(default_factory=lambda: float(_env("RAG_MIN_COVERAGE", "0.6")))
    min_cosine: float = field(default_factory=lambda: float(_env("RAG_MIN_COSINE", "0.45")))

    # Optional model access (any OpenAI-compatible endpoint).
    api_key: str = field(default_factory=lambda: _env("OPENAI_API_KEY"))
    base_url: str = field(default_factory=lambda: _env("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/"))
    chat_model: str = field(default_factory=lambda: _env("RAG_CHAT_MODEL", "gpt-4o-mini"))
    embed_model: str = field(default_factory=lambda: _env("RAG_EMBED_MODEL", "text-embedding-3-small"))
    use_embeddings: bool = field(default_factory=lambda: _env("RAG_USE_EMBEDDINGS", "0") == "1")
    # RAG_MODE=extractive forces the offline answerer even when a key is set.
    mode: str = field(default_factory=lambda: _env("RAG_MODE", "auto"))

    @property
    def llm_enabled(self) -> bool:
        return bool(self.api_key) and self.mode != "extractive"

    @property
    def embeddings_enabled(self) -> bool:
        return bool(self.api_key) and self.use_embeddings
