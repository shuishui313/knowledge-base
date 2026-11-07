install:
	pip install -r requirements.txt

test:
	python -m pytest -q

eval:
	python -m eval.run

serve:
	uvicorn app.api:app --host 0.0.0.0 --port 8000

fetch:
	pip install -r requirements-fetch.txt && python scripts/fetch_corpus.py
