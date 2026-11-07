from fastapi.testclient import TestClient

from app.answer import Assistant, parse_llm_reply
from app.api import app
from app.config import Settings
from app.corpus import load_chunks

S = Settings()
client = TestClient(app)


def test_chunks_stay_inside_one_section():
    chunks = load_chunks(S.corpus_dir, S.chunk_words)
    assert chunks
    for c in chunks:
        assert c.doc_id and c.section is not None
        assert len(c.text.split()) <= S.chunk_words * 2


def test_role_filter_hides_other_pages():
    a = Assistant()
    hits = a.retriever.search("TechTAS STEM top 100 universities", "student", k=10)
    assert all("student" in h.chunk.audience for h in hits)
    assert all(h.chunk.doc_id != "techtas" for h in hits)


def test_answerable_question_is_cited():
    a = Assistant()
    ans = a.ask("How many hours per week can non-local students take part-time jobs on campus?", "student")
    assert not ans.refused
    assert any(c.doc_id == "study" for c in ans.citations)


def test_api_contract_and_refusal():
    r = client.post("/ask", json={"question": "What is the statutory minimum wage in Hong Kong?", "role": "student"})
    assert r.status_code == 200
    body = r.json()
    assert body["refused"] is True and body["citations"] == []
    assert client.post("/ask", json={"question": "IANG stay?", "role": "admin"}).status_code == 400
    assert client.get("/healthz").json()["status"] == "ok"


def test_llm_reply_without_valid_citation_is_refused():
    a = Assistant()
    hits = a.retriever.search("IANG 24 months stay", "student", k=3)
    assert parse_llm_reply('{"answer": "24 months."}', hits).refused
    assert parse_llm_reply('{"answer": "24 months [9]."}', hits).refused
    assert not parse_llm_reply('{"answer": "24 months [1]."}', hits).refused
