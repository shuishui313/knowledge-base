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

<a id="conventions"></a>

## Conventions

- One Markdown file per note, stored in this folder. Generate the filename with the serial from the start, and keep both the Chinese and English terms: `AI-NN-中文名(English).md`, as in `AI-01-AI幻觉(Hallucination).md`. `NN` follows the date order already in this table, zero-padded to two digits. A new note takes the next number. Never reuse or renumber an assigned serial. If a note has no date line, do not add one just to carry the serial.
- The same serial stays in the note header and in the `编号` / `No.` column of this file and `README.md`. A later note on the same topic takes the next `AI-NN` and uses `AI-NN-中文名(English).md`.
- Lead with what Hong Kong FDE hiring tests, then the definition and how to use the term. Do not force the five FDE lesson headings. Answers differ by company type: virtual bank or insurer, logistics, public counter, and AI product or solutions company. Go deep on one type and use one comparison table for the others. Public interview write-ups are only patterns you can check, labeled 「公开面经里的常见问法」; do not invent a quote, a candidate story, or a verbatim question from a named bank or insurer. A short 「拓展补充」 may follow. Include a one-minute 「面试怎么说」: English a candidate can say, plus when to explain in Cantonese on site and when to write the confirmation in English. Keep exactly two quiz questions; one asks how the answer changes for a different company type. Answers go in `<details><summary>参考答案</summary>`.
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
