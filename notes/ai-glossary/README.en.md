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
