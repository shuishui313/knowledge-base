"""Load the committed corpus snapshot and cut it into section-aware chunks."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Document:
    id: str
    title: str
    source_url: str
    fetched: str
    audience: tuple[str, ...]
    body: str


@dataclass(frozen=True)
class Chunk:
    id: str            # "<doc_id>#<n>"
    doc_id: str
    title: str         # document title
    section: str       # nearest "## " heading above the text
    text: str
    source_url: str
    fetched: str
    audience: tuple[str, ...]

    @property
    def search_text(self) -> str:
        # Title and section are indexed with the body so that a question
        # naming a scheme ("TTPS", "IANG") lands on that scheme's page.
        return f"{self.title}\n{self.section}\n{self.text}"


def parse_document(path: Path) -> Document:
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
    if not m:
        raise ValueError(f"{path} has no front matter")
    meta = {}
    for line in m.group(1).splitlines():
        key, _, value = line.partition(":")
        meta[key.strip()] = json.loads(value.strip())
    for required in ("id", "title", "source_url", "fetched", "audience"):
        if required not in meta:
            raise ValueError(f"{path} front matter is missing {required!r}")
    return Document(
        id=meta["id"],
        title=meta["title"],
        source_url=meta["source_url"],
        fetched=meta["fetched"],
        audience=tuple(meta["audience"]),
        body=m.group(2).strip(),
    )


def load_documents(corpus_dir: Path) -> list[Document]:
    docs = [parse_document(p) for p in sorted(corpus_dir.glob("*.md"))]
    if not docs:
        raise FileNotFoundError(f"no corpus files in {corpus_dir}")
    return docs


_SENT_SPLIT = re.compile(r"(?<=[.;:])\s+(?=[A-Z(\"“])")


def _split_long(paragraph: str, max_words: int) -> list[str]:
    if len(paragraph.split()) <= max_words:
        return [paragraph]
    pieces, current = [], []
    for sentence in _SENT_SPLIT.split(paragraph):
        if current and len(" ".join(current + [sentence]).split()) > max_words:
            pieces.append(" ".join(current))
            current = []
        current.append(sentence)
    if current:
        pieces.append(" ".join(current))
    return pieces


def chunk_document(doc: Document, max_words: int = 180) -> list[Chunk]:
    """Split on "## " headings, then pack paragraphs up to max_words.

    Chunks never cross a heading, so a citation always points at one section
    of one page. List items stay next to the sentence that introduces them
    because packing is greedy over consecutive paragraphs.
    """
    sections: list[tuple[str, list[str]]] = []
    heading = doc.title
    paras: list[str] = []
    for block in re.split(r"\n\s*\n", doc.body):
        block = block.strip()
        if not block or block.startswith("# "):
            continue
        if block.startswith("## "):
            if paras:
                sections.append((heading, paras))
            heading, paras = block[3:].strip(), []
            continue
        paras.extend(_split_long(block, max_words))
    if paras:
        sections.append((heading, paras))

    chunks: list[Chunk] = []
    for heading, paras in sections:
        buf: list[str] = []
        for para in paras:
            if buf and len(" ".join(buf + [para]).split()) > max_words:
                chunks.append(_make_chunk(doc, len(chunks), heading, buf))
                buf = []
            buf.append(para)
        if buf:
            chunks.append(_make_chunk(doc, len(chunks), heading, buf))
    return chunks


def _make_chunk(doc: Document, n: int, section: str, paras: list[str]) -> Chunk:
    return Chunk(
        id=f"{doc.id}#{n}",
        doc_id=doc.id,
        title=doc.title,
        section=section,
        text="\n".join(paras),
        source_url=doc.source_url,
        fetched=doc.fetched,
        audience=doc.audience,
    )


def load_chunks(corpus_dir: Path, max_words: int = 180) -> list[Chunk]:
    chunks: list[Chunk] = []
    for doc in load_documents(corpus_dir):
        chunks.extend(chunk_document(doc, max_words))
    return chunks
