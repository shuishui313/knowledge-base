# Hong Kong FDE short lessons

Lessons are in date order. The first four are beginner; from Day 5 the same four themes return with new examples at advanced level. Each one is about a 5–8 minute read: scene, concept, Hong Kong example, a short drill, then two quiz questions. Standard answers stay collapsed after the quiz. Try them before you open them.

[中文](README.md) | **English**

[Lessons](#lessons) · [Conventions](#conventions)

Lesson bodies are in Simplified Chinese. This page is the bilingual index. Examples use plausible scenes (a virtual bank, a warehouse, a public counter) and do not describe any real organization's internal material.

<a id="lessons"></a>

## Index

| No. | Date | Day | Theme | Level | Title |
|-----|------|-----|-------|-------|-------|
| FDE-01 | 2026-11-02 | 1 | The role | Beginner | [How FDE differs from SWE](FDE-01-2026-11-02-岗位-FDE和SWE差在哪.md) (in Chinese) |
| FDE-02 | 2026-11-03 | 2 | The Hong Kong market | Beginner | [Reading an HK FDE job description](FDE-02-2026-11-03-市场-读懂香港FDE-JD.md) (in Chinese) |
| FDE-03 | 2026-11-04 | 3 | Making it technical | Beginner | [Turn one sentence into a shippable design](FDE-03-2026-11-04-技术落地-一句话拆成可交付方案.md) (in Chinese) |
| FDE-04 | 2026-11-05 | 4 | Delivery and communication | Beginner | [When the client says "close enough"](FDE-04-2026-11-05-交付沟通-差不多就行时对齐范围.md) (in Chinese) |
| FDE-05 | 2026-11-06 | 5 | The role | Advanced | [Who signs off: sponsor, counterpart, acceptor](FDE-05-2026-11-06-岗位-谁说了算-干系人与验收人.md) (in Chinese) |

Day 3 and Day 4 share one example: risk hints on a virtual-bank relationship manager's workbench. Day 3 splits the ask into API, data, and integration. Day 4 turns the same sentence into scope, an out-of-scope list, and a one-week plan.

Day 5 returns to the role theme with a claims-pilot stakeholder map: sponsor, day-to-day counterpart, and the person who actually accepts the work. It does not repeat Day 1's FDE-versus-SWE comparison.

<a id="conventions"></a>

## Conventions

- One Markdown file per lesson. Generate the filename with the serial from the start: `FDE-NN-YYYY-MM-DD-主题简述.md`. `NN` matches Day, zero-padded to two digits. A new lesson takes the next number. Never reuse or renumber an assigned serial.
- The same serial stays in the note header and in the `编号` / `No.` column of this file and `README.md`.
- Keep the header (serial, date, day, theme, level), the five sections, and standard answers after the quiz.
- Optional related YouTube links go in an `延伸观看` (Related watching) section after the quiz answers and before the series footer. At most 2 videos per series per day. Include only a relatively popular YouTube explainer, a single short lesson, or an insightful take. Do not include ordinary long or generic courses. If nothing qualifies, omit the section. Do not pad. Do not write view counts.
- Add the file here and append a row to this table and to `README.md`. Steps: [fde-daily-lesson](../../examples/recipes/fde-daily-lesson/README.md) (in Chinese).

<details>
<summary>Repository layout</summary>

| Folder | What |
|--------|------|
| [notes/ai-glossary/](../../notes/ai-glossary/README.en.md) | AI glossary notes. Note files are in Chinese |
| [notes/ai-algorithms/](../../notes/ai-algorithms/README.en.md) | AI algorithm lessons. Note files are in Chinese |
| [notes/hk-fde/](README.en.md) | Hong Kong FDE short lessons (this folder). Lesson files are in Chinese |
| [prompt-templates/](../../prompt-templates/README.en.md) | Prompt templates, 8 files, in Chinese |
| [examples/recipes/](../../examples/recipes/README.en.md) | Steps for adding a lesson, note, algorithm, or template. Guides are in Chinese |
| [skills/knowledge-base/SKILL.md](../../skills/knowledge-base/SKILL.md) | Agent handbook (in Chinese) |
| [docs/](../../docs/decisions.md) | [Decisions](../../docs/decisions.md) · [Declined](../../docs/declined.md) (in Chinese) |

</details>
