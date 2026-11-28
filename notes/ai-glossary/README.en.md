# AI Glossary

Short notes on AI terms and techniques. Each note is written in Simplified Chinese. This page is the index.

[中文](README.md) | **English**

[Index](#index) · [Conventions](#conventions)

<a id="index"></a>

## Index

| No. | Topic | Term | Date | Note |
|-----|-------|------|------|------|
| AI-01 | Hallucination | Hallucination | 2026-10-18 | [AI 幻觉（Hallucination）](AI-01-AI幻觉(Hallucination).md) (in Chinese) |
| AI-02 | Retrieval-augmented generation | RAG | 2026-11-05 | [RAG 检索增强生成（RAG）](AI-02-RAG检索增强生成(RAG).md) (in Chinese) |
| AI-03 | Tool calling | Tool Calling | 2026-11-06 | [工具调用（Tool Calling）](AI-03-工具调用(Tool-Calling).md) (in Chinese) |
| AI-04 | Agent | Agent | 2026-11-07 | [智能体（Agent）](AI-04-智能体(Agent).md) (in Chinese) |
| AI-05 | Evaluation | Evaluation | 2026-11-08 | [评测（Evaluation）](AI-05-评测(Evaluation).md) (in Chinese) |
| AI-06 | Prompt engineering | Prompt Engineering | 2026-11-09 | [提示词工程（Prompt Engineering）](AI-06-提示词工程(Prompt-Engineering).md) (in Chinese) |
| AI-07 | Fine-tuning | Fine-Tuning | 2026-11-10 | [微调（Fine-Tuning）](AI-07-微调(Fine-Tuning).md) (in Chinese) |
| AI-08 | Embeddings and vector search | Embedding | 2026-11-11 | [嵌入与向量检索（Embedding）](AI-08-嵌入与向量检索(Embedding).md) (in Chinese) |
| AI-09 | Prompt injection | Prompt Injection | 2026-11-12 | [提示注入（Prompt Injection）](AI-09-提示注入(Prompt-Injection).md) (in Chinese) |
| AI-10 | Context engineering | Context Engineering | 2026-11-13 | [上下文工程（Context Engineering）](AI-10-上下文工程(Context-Engineering).md) (in Chinese) |
| AI-11 | Structured output | Structured Output | 2026-11-14 | [结构化输出（Structured Output）](AI-11-结构化输出(Structured-Output).md) (in Chinese) |
| AI-12 | Model Context Protocol | MCP | 2026-11-16 | [模型上下文协议（MCP）](AI-12-模型上下文协议(MCP).md) (in Chinese) |
| AI-13 | Reasoning models | Reasoning Models | 2026-11-17 | [推理模型（Reasoning Models）](AI-13-推理模型(Reasoning-Models).md) (in Chinese) |
| AI-14 | Guardrails | Guardrails | 2026-11-18 | [护栏（Guardrails）](AI-14-护栏(Guardrails).md) (in Chinese) |
| AI-15 | Human-in-the-loop | Human-in-the-Loop | 2026-11-19 | [人工在环（Human-in-the-Loop）](AI-15-人工在环(Human-in-the-Loop).md) (in Chinese) |
| AI-16 | Observability | Observability | 2026-11-20 | [可观测性（Observability）](AI-16-可观测性(Observability).md) (in Chinese) |
| AI-17 | Permission-aware retrieval | Permission-aware Retrieval | 2026-11-21 | [权限感知检索（Permission-aware Retrieval）](AI-17-权限感知检索(Permission-aware-Retrieval).md) (in Chinese) |
| AI-18 | Semantic caching | Semantic Caching | 2026-11-22 | [语义缓存（Semantic Caching）](AI-18-语义缓存(Semantic-Caching).md) (in Chinese) |
| AI-19 | Query routing | Query Routing | 2026-11-23 | [查询路由（Query Routing）](AI-19-查询路由(Query-Routing).md) (in Chinese) |
| AI-20 | Grounding and citation | Grounding / Citation | 2026-11-24 | [引用与溯源（Grounding and Citation）](AI-20-引用与溯源(Grounding-and-Citation).md) (in Chinese) |
| AI-21 | Query rewriting | Query Rewriting | 2026-11-25 | [查询改写（Query Rewriting）](AI-21-查询改写(Query-Rewriting).md) (in Chinese) |
| AI-22 | Reranking | Reranking | 2026-11-26 | [重排序（Reranking）](AI-22-重排序(Reranking).md) (in Chinese) |
| AI-23 | Hybrid search | Hybrid Search | 2026-11-27 | [混合检索（Hybrid Search）](AI-23-混合检索(Hybrid-Search).md) (in Chinese) |
| AI-24 | Chunking | Chunking | 2026-11-28 | [文档切块（Chunking）](AI-24-文档切块(Chunking).md) (in Chinese) |

<a id="conventions"></a>

## Conventions

- One Markdown file per note, stored in this folder. Generate the filename with the serial from the start, and keep both the Chinese and English terms: `AI-NN-中文名(English).md`, as in `AI-01-AI幻觉(Hallucination).md`. `NN` follows the date order already in this table, zero-padded to two digits. A new note takes the next number. Never reuse or renumber an assigned serial. If a note has no date line, do not add one just to carry the serial.
- The same serial stays in the note header and in the `编号` / `No.` column of this file and `README.md`. A later note on the same topic takes the next `AI-NN` and uses `AI-NN-中文名(English).md`.
- Lead with what Hong Kong FDE hiring tests, then the definition and how to use the term. Do not force the five FDE lesson headings. Employers follow the four Hong Kong FDE types: (1) AI-native or product companies (e.g. voice AI, LLM platforms), (2) big-tech cloud and platforms (e.g. BytePlus, Alibaba Cloud), (3) consulting and systems integrators (e.g. Deloitte), (4) in-house FDE teams at enterprises (banking and insurance, property, funds). Do not force a four-row comparison table into every note; use one only where it really helps, at most one per note. Public interview write-ups are only patterns you can check, labeled 「公开面经里的常见问法」; do not invent a quote, a candidate story, or a verbatim question from a named bank or insurer. A short 「拓展补充」 may follow. Include a 「面试怎么说」: about 45–60 seconds of English a candidate can say, plus one Chinese tip: explain it in the client's usual language (Cantonese or Mandarin) and write the conclusion down in English. Keep exactly two quiz questions; one may ask how the answer changes for a different employer type. Answers go in `<details><summary>参考答案</summary>`.
- Optional related YouTube links go in an `延伸观看` (Related watching) section after the one-sentence summary. At most 2 videos per series per day. Include only a relatively popular YouTube explainer, a single short lesson, or an insightful take. Do not include ordinary long or generic courses. If nothing qualifies, omit the section. Do not pad. Do not write view counts.
- When you add a note, put the file here and add a row to this table and to `README.md`. Steps: [ai-glossary-note](../../examples/recipes/ai-glossary-note/README.md) (in Chinese).

<details>
<summary>Repository layout</summary>

| Folder | What |
|--------|------|
| [notes/ai-glossary/](README.en.md) | AI glossary notes (this folder). Note files are in Chinese |
| [notes/ai-algorithms/](../../notes/ai-algorithms/README.en.md) | AI algorithm lessons. Note files are in Chinese |
| [notes/hk-fde/](../../notes/hk-fde/README.en.md) | Hong Kong FDE short lessons. Lesson files are in Chinese |
| [prompt-templates/](../../prompt-templates/README.en.md) | Prompt templates, 8 files, in Chinese |
| [examples/recipes/](../../examples/recipes/README.en.md) | Steps for adding a lesson, note, algorithm, or template. Guides are in Chinese |
| [skills/knowledge-base/SKILL.md](../../skills/knowledge-base/SKILL.md) | Agent handbook (in Chinese) |
| [docs/](../../docs/decisions.md) | [Decisions](../../docs/decisions.md) · [Declined](../../docs/declined.md) (in Chinese) |

</details>
