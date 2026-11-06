# Gss Knowledge Base

Personal hub for AI learning notes, algorithm lessons, Hong Kong FDE short lessons, and prompt templates ([shuishui313](https://github.com/shuishui313)).

[中文](README.md) | **English**

[Sections](#sections) · [Related projects](#related) · [Conventions](#conventions)

Public reading, no login: [Hong Kong FDE learning site](https://shuishui313.github.io/knowledge-base/). Lesson bodies are in Chinese.

<a id="sections"></a>

## Sections

| Section | What | Path |
|---------|------|------|
| AI glossary | Term notes that lead with how Hong Kong FDE hiring tests the idea | [notes/ai-glossary](notes/ai-glossary/README.en.md) |
| Algorithms | ML algorithms from easier to harder, opening with how FDE hiring uses them | [notes/ai-algorithms](notes/ai-algorithms/README.en.md) |
| HK FDE lessons | Hiring first: scene → concept → example → what to say in an interview → drill → quiz | [notes/hk-fde](notes/hk-fde/README.en.md) |
| Prompt templates | Role / Task / Requirements / Output Format, 8 templates | [prompt-templates](prompt-templates/README.en.md) |

Lesson files, glossary notes, and prompt template files linked from those indexes are in Chinese.

<a id="related"></a>

## Related projects

| Project | Summary | Repo |
|---------|---------|------|
| EveryNews | Daily AI news card pipeline | [shuishui313/EveryNews](https://github.com/shuishui313/EveryNews) |
| MediaMgDashboard | Media management dashboard | [shuishui313/MediaMgDashboard](https://github.com/shuishui313/MediaMgDashboard) |

<a id="conventions"></a>

## Conventions

- New AI note: add it under `notes/ai-glossary/` and update both `README.md` and `README.en.md` there
- New algorithm note: add it under `notes/ai-algorithms/` and update both README indexes there
- New FDE lesson: add it under `notes/hk-fde/` and update both README indexes there
- Filenames include a stable serial from the start, so a note can be found by number: FDE is `FDE-NN-YYYY-MM-DD-主题简述.md` (NN matches Day), an AI note is `AI-NN-中文名(English).md` (NN follows the index date), an algorithm note is `ALG-NN-中文名(English).md` (NN is the lesson order). Never reuse or renumber an assigned serial
- Note bodies are Simplified Chinese. Directory indexes switch language with a top-bar link: `**中文** | [English](README.en.md)` on the Chinese file, `[中文](README.md) | **English**` on the English file. Do not use a details widget as the language switch
- FDE lessons, glossary notes, and algorithm notes lead with what Hong Kong FDE hiring tests. Answers differ by company type: virtual bank or insurer, logistics, public counter, and AI product or solutions company. One type is written in depth; the others share a comparison table. Public interview write-ups are labeled 「公开面经里的常见问法」 and are not invented quotes from a named firm. Each note has a one-minute 「面试怎么说」, and one of the two quiz questions switches company type. See each folder index for the full rule
- How to add a piece: [examples/recipes](examples/recipes/README.en.md). Agents start at [AGENTS.md](AGENTS.md) (in Chinese)
- The public site lives in `site/` and is built from `notes/`. A push to `main` deploys it with GitHub Actions. Do not rewrite lesson prose for the site
- This repo only edits notes, templates, and conventions kept here. Do not change EveryNews, MediaMgDashboard, or ruflo from here
- Repo names: `kebab-case`

<details>
<summary>Repository layout</summary>

| Folder | What |
|--------|------|
| [notes/ai-glossary/](notes/ai-glossary/README.en.md) | AI glossary notes. Note files are in Chinese |
| [notes/ai-algorithms/](notes/ai-algorithms/README.en.md) | AI algorithm lessons. Note files are in Chinese |
| [notes/hk-fde/](notes/hk-fde/README.en.md) | Hong Kong FDE short lessons. Lesson files are in Chinese |
| [prompt-templates/](prompt-templates/README.en.md) | Prompt templates, 8 files, in Chinese |
| [examples/recipes/](examples/recipes/README.en.md) | Steps for adding a lesson, note, algorithm, or template. Guides are in Chinese |
| [skills/knowledge-base/SKILL.md](skills/knowledge-base/SKILL.md) | Agent handbook (in Chinese) |
| [docs/](docs/decisions.md) | [Decisions](docs/decisions.md) · [Declined](docs/declined.md) (in Chinese) |
| [site/](site/) | Public reading site, built from `notes/` |

</details>
