"""Download the source pages listed in config/sources.json and write a cleaned
text snapshot to data/corpus/<id>.md.

Only needed when you want to refresh the snapshot. The service, tests and
eval run offline from the committed files.

    pip install -r requirements-fetch.txt
    python scripts/fetch_corpus.py            # all sources
    python scripts/fetch_corpus.py iang gep   # only some
"""

from __future__ import annotations

import datetime as dt
import json
import re
import sys
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup, Tag

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config" / "sources.json"
OUT_DIR = ROOT / "data" / "corpus"
USER_AGENT = "hk-policy-rag/0.1 (portfolio demo; contact via GitHub shuishui313)"

BLOCKS = ["h1", "h2", "h3", "h4", "h5", "p", "li", "tr", "dt", "dd"]
# Page furniture that shows up inside the content area on ImmD pages.
NOISE = {
    "apply now", "expand all", "collapse all", "before applying", "applying",
    "after applying", "print", "fee table", "entry visas / permits",
    "extension of stay", "skip to main content", "back to top", "top",
}


def clean_ws(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    # get_text(" ") leaves spaces before punctuation around inline links.
    return re.sub(r"\s+([,.;:)\]])", r"\1", text)


def is_tab_header(el: Tag) -> bool:
    # ImmD renders accordion section titles ("Eligibility Criteria") as divs.
    return el.name == "div" and "div-tab-header-a" in (el.get("class") or [])


def is_block(el: Tag) -> bool:
    return el.name in BLOCKS or is_tab_header(el)


def own_text(el: Tag) -> str:
    """Text of el without nested blocks, which are emitted on their own."""
    parts = []
    for child in el.children:
        if isinstance(child, Tag) and (is_block(child) or child.find(is_block)):
            continue
        parts.append(child.get_text(" ") if isinstance(child, Tag) else str(child))
    return clean_ws(" ".join(parts))


def content_root(soup: BeautifulSoup) -> Tag:
    tabs = soup.select("div.tabcontent")
    if tabs:
        wrapper = soup.new_tag("div")
        for tab in tabs:
            wrapper.append(tab.extract())
        return wrapper
    return soup.find("main") or soup.body or soup


def html_to_text(html: str) -> tuple[str, str]:
    soup = BeautifulSoup(html, "html.parser")
    title = clean_ws(soup.title.get_text()) if soup.title else ""
    title = re.sub(r"\s*\|\s*Immigration Department\s*$", "", title)
    for tag in soup(["script", "style", "noscript", "nav", "header", "footer", "form"]):
        tag.decompose()
    root = content_root(soup)

    lines: list[str] = []
    seen: set[str] = set()
    for el in root.find_all(is_block):
        if el.name in ("li", "p", "dt", "dd") and el.find_parent("tr"):
            continue
        if el.name == "tr":
            cells = [clean_ws(c.get_text(" ")) for c in el.find_all(["th", "td"])]
            text = " | ".join(c for c in cells if c)
        else:
            text = own_text(el)
        if not text or text.lower() in NOISE:
            continue
        if el.name.startswith("h") or is_tab_header(el):
            line = "## " + text
        elif el.name == "li":
            line = "- " + text
        else:
            line = text
        # ImmD repeats the same paragraph across tabs; keep the first copy.
        key = line.lower()
        if key in seen and not line.startswith("## "):
            continue
        seen.add(key)
        lines.append(line)

    # Drop headings that ended up with no body after deduplication.
    out: list[str] = []
    for i, line in enumerate(lines):
        nxt = lines[i + 1] if i + 1 < len(lines) else "## "
        if line.startswith("## ") and nxt.startswith("## "):
            continue
        out.append(line)
    return title, "\n\n".join(out)


def render(src: dict, title: str, body: str, meta: dict) -> str:
    header = {
        "id": src["id"],
        "title": title,
        "source_url": src["url"],
        "publisher": meta["publisher"],
        "fetched": dt.date.today().isoformat(),
        "audience": src["audience"],
        "licence": meta["licence_note"],
    }
    front = "\n".join(f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in header.items())
    return f"---\n{front}\n---\n\n# {title}\n\n{body}\n"


def main(argv: list[str]) -> int:
    meta = json.loads(CONFIG.read_text(encoding="utf-8"))
    wanted = set(argv)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers["User-Agent"] = USER_AGENT
    failures = 0
    for src in meta["sources"]:
        if wanted and src["id"] not in wanted:
            continue
        try:
            resp = session.get(src["url"], timeout=30)
            resp.raise_for_status()
        except requests.RequestException as exc:
            print(f"FAIL {src['id']}: {exc}", file=sys.stderr)
            failures += 1
            continue
        resp.encoding = resp.apparent_encoding or "utf-8"
        title, body = html_to_text(resp.text)
        path = OUT_DIR / f"{src['id']}.md"
        path.write_text(render(src, title, body, meta), encoding="utf-8")
        print(f"ok   {src['id']:<20} {len(body):>7} chars  -> {path.relative_to(ROOT)}")
        time.sleep(1)  # be polite to the government server
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
