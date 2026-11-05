# Prompt templates

Eight reusable prompt templates for engineering, product, and operations work. Each one uses the same `Role / Task / Requirements / Output Format` structure. Replace every `{variable}` before you send it.

[中文](README.md) | **English**

## Templates

| Template | Use | For | File |
|----------|-----|-----|------|
| Code Review | Review quality, security, and performance; return a severity-ranked issue list and fixes | Engineers / tech leads | [code-review.md](code-review.md) |
| PRD | Turn a business idea into a PRD with functional requirements, acceptance criteria, and milestones | Product managers | [prd.md](prd.md) |
| Test Cases | Design coverage from a feature description, including a traceability matrix | QA engineers | [test-cases.md](test-cases.md) |
| Competitor Analysis | Compare positioning, features, business model, and strengths; recommend a response | Product / marketing / ops | [competitor-analysis.md](competitor-analysis.md) |
| Data Analysis | Break down metrics, trends, and anomalies into actions | Analysts / ops | [data-analysis.md](data-analysis.md) |
| Meeting Minutes | Turn notes into decisions and tracked action items | Anyone | [meeting-minutes.md](meeting-minutes.md) |
| Term Research | Research a term into a short learning brief: definition, research, industry context, and a study path | Learners / researchers / writers | [term-research.md](term-research.md) |
| Handoff | At the end of a session, record progress, open issues, and the context needed to continue | Anyone / project handoff | [handoff.md](handoff.md) |

## Structure

- **Role**: who the model is and what it is responsible for
- **Task**: the job and the inputs
- **Requirements**: structure, quality bar, and constraints
- **Output Format**: the skeleton of the answer you want to keep

## How to use

1. Copy the body of the `.md` file into your chat or prompt editor.
2. Replace each `{variable}` with real input.
3. Add or remove items under Requirements and Output Format; keep the four fields.
4. Tighten tone or length in Role or Requirements when you need to (for example, "under 500 words" or "for a non-technical reader").

## Notes

- Templates are written in Chinese and keep the English terms they need. Ask for English output in Task or Requirements.
- Remove secrets, personal data, and live financials before you paste.
- When a variant works often, add it back to this folder.

*(AI-generated content, for reference only.)*
