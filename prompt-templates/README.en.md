# Prompt templates

Eight reusable prompt templates for engineering, product, and operations work. New templates, and most files already here, use `Role / Task / Requirements / Output Format`. Replace every `{variable}` before you send it. `handoff.md` and `term-research.md` are variants; see Structure.

[中文](README.md) | **English**

[Templates](#templates) · [Structure](#structure) · [How to use](#usage) · [Notes](#notes)

<a id="templates"></a>

## Templates

| Template | Use | For | File |
|----------|-----|-----|------|
| Code Review | Review quality, security, and performance; return a severity-ranked issue list and fixes | Engineers / tech leads | [code-review.md](code-review.md) (in Chinese) |
| PRD | Turn a business idea into a PRD with functional requirements, acceptance criteria, and milestones | Product managers | [prd.md](prd.md) (in Chinese) |
| Test Cases | Design coverage from a feature description, including a traceability matrix | QA engineers | [test-cases.md](test-cases.md) (in Chinese) |
| Competitor Analysis | Compare positioning, features, business model, and strengths; recommend a response | Product / marketing / ops | [competitor-analysis.md](competitor-analysis.md) (in Chinese) |
| Data Analysis | Break down metrics, trends, and anomalies into actions | Analysts / ops | [data-analysis.md](data-analysis.md) (in Chinese) |
| Meeting Minutes | Turn notes into decisions and tracked action items | Anyone | [meeting-minutes.md](meeting-minutes.md) (in Chinese) |
| Term Research | Research a term into a short learning brief: definition, research, industry context, and a study path | Learners / researchers / writers | [term-research.md](term-research.md) (in Chinese) |
| Handoff | At the end of a session, record progress, open issues, and the context needed to continue | Anyone / project handoff | [handoff.md](handoff.md) (in Chinese) |

<a id="structure"></a>

## Structure

- **Role**: who the model is and what it is responsible for
- **Task**: the job and the inputs
- **Requirements**: structure, quality bar, and constraints
- **Output Format**: the skeleton of the answer you want to keep

`handoff.md` and `term-research.md` use a close variant (a middle section plus `Output Requirements`). New templates follow the four fields above. See [code-review.md](code-review.md) (in Chinese).

<a id="usage"></a>

## How to use

1. Copy the body of the `.md` file into your chat or prompt editor.
2. Replace each `{variable}` with real input.
3. Add or remove items under Requirements and Output Format; keep the four fields.
4. Tighten tone or length in Role or Requirements when you need to (for example, "under 500 words" or "for a non-technical reader").

<a id="notes"></a>

## Notes

- Templates are written in Chinese and keep the English terms they need. Ask for English output in Task or Requirements.
- Remove secrets, personal data, and live financials before you paste.
- When a variant works often, add it back to this folder and add a row to this table and to `README.md`. Steps: [prompt-template](../examples/recipes/prompt-template/README.md) (in Chinese).
- Link only files that exist here. `email-draft.md` was removed; do not put it back in the table.

*(AI-generated content, for reference only.)*

<details>
<summary>Repository layout</summary>

| Folder | What |
|--------|------|
| [notes/ai-glossary/](../notes/ai-glossary/README.en.md) | AI glossary notes. Note files are in Chinese |
| [notes/hk-fde/](../notes/hk-fde/README.en.md) | Hong Kong FDE short lessons. Lesson files are in Chinese |
| [prompt-templates/](README.en.md) | Prompt templates, 8 files, in Chinese (this folder) |
| [examples/recipes/](../examples/recipes/README.en.md) | Steps for adding a lesson, note, or template. Guides are in Chinese |
| [skills/knowledge-base/SKILL.md](../skills/knowledge-base/SKILL.md) | Agent handbook (in Chinese) |
| [docs/](../docs/decisions.md) | [Decisions](../docs/decisions.md) · [Declined](../docs/declined.md) (in Chinese) |

</details>
