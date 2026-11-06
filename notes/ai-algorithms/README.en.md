# AI algorithms

Common machine-learning algorithms that Hong Kong FDE hiring actually uses, from easier to harder. Each note is about a 5–8 minute read: a hiring opening, when it fits and when it does not, then scene, concept, Hong Kong example, a one-minute 「面试怎么说」, a short drill, and two quiz questions. Standard answers stay collapsed after the quiz. Try them before you open them. Related watching is optional: at most 2 YouTube videos per series per day, and only a relatively popular explainer, one short lesson, or an insightful take. Ordinary long or generic courses stay out. If nothing qualifies, omit the section. Do not write view counts.

[中文](README.md) | **English**

[Lessons](#lessons) · [Order](#order) · [Conventions](#conventions)

Lesson bodies are in Simplified Chinese. This page is the bilingual index. Examples use plausible public scenes and do not describe any real organization's internal material.

<a id="lessons"></a>

## Index

| No. | Category | Level | Interview frequency | Applicable scenarios | Title |
|-----|----------|-------|---------------------|----------------------|-------|
| ALG-01 | Regression | Beginner | High in finance; deriving the formula is rare in FDE write-ups | Predict a continuous number (premium, limit, handling days). Bank or insurer: an explainable baseline. AI product company: a comparison line, not a derivation | [Linear regression](ALG-01-线性回归(Linear-Regression).md) (in Chinese) |

<a id="order"></a>

## Study order

ALG-01 linear regression is written. The items below are planned and have no files yet, so this page does not link them:

- ALG-02 logistic regression
- ALG-03 decision tree
- ALG-04 k-nearest neighbors
- ALG-05 K-Means
- Then: random forest, gradient boosting / XGBoost, naive Bayes, SVM, PCA, neural networks and backpropagation, overfitting and regularization, CNN, attention / Transformer

Serials after ALG-05 are assigned when those notes are written, in lesson order. An assigned serial is not reused or renumbered.

<a id="conventions"></a>

## Conventions

- One Markdown file per algorithm. Generate the filename with the serial from the start: `ALG-NN-中文名(English).md`. `NN` is the lesson order, zero-padded to two digits. A new note takes the next number. Never reuse or renumber an assigned serial.
- The header carries the serial, date, category, level, and interview frequency. The same serial appears in this table's `No.` column and in `README.md` as `编号`. Example: `**ALG-01** · **2026-11-06** · **分类** 回归 · **难度** 入门 · **面试频率** 金融场景高；纯公式推导在 FDE 面经里少见`.
- A hiring opening comes first, then applicable and not-applicable scenarios, scene, concept, Hong Kong example, 「面试怎么说」, drill, and two quiz questions. Answers go in `<details><summary>参考答案</summary>`. Lead with Hong Kong FDE hiring. Answers differ by company type: virtual bank or insurer, logistics, public counter, and AI product or solutions company. Go deep on one type and use one comparison table for the others. Public interview write-ups are only patterns you can check, labeled 「公开面经里的常见问法」; do not invent a quote, a candidate story, or a verbatim question from a named bank or insurer. A short 「拓展补充」 may follow. 「面试怎么说」 is about one minute: English a candidate can say, plus when to explain in Cantonese on site and when to write the confirmation in English. Keep two quiz questions; one asks how the answer changes for a different company type. Preview the next lesson by title only. Do not create the file or link it until it exists.
- Optional YouTube links go in `延伸观看` (Related watching) after the quiz answers and before the series footer. At most 2 videos per series per day. Include only a relatively popular YouTube explainer, a single short lesson, or an insightful take. Do not include ordinary long or generic courses. If nothing qualifies, omit the section. Do not pad. Do not write view counts.
- Add the file here and append a row to this table and to `README.md`. The table keeps an applicable-scenarios column. Steps: [ai-algorithm-note](../../examples/recipes/ai-algorithm-note/README.md) (in Chinese).

<details>
<summary>Repository layout</summary>

| Folder | What |
|--------|------|
| [notes/ai-glossary/](../../notes/ai-glossary/README.en.md) | AI glossary notes. Note files are in Chinese |
| [notes/ai-algorithms/](README.en.md) | AI algorithm lessons (this folder). Note files are in Chinese |
| [notes/hk-fde/](../../notes/hk-fde/README.en.md) | Hong Kong FDE short lessons. Lesson files are in Chinese |
| [prompt-templates/](../../prompt-templates/README.en.md) | Prompt templates, 8 files, in Chinese |
| [examples/recipes/](../../examples/recipes/README.en.md) | Steps for adding a lesson, note, algorithm, or template. Guides are in Chinese |
| [skills/knowledge-base/SKILL.md](../../skills/knowledge-base/SKILL.md) | Agent handbook (in Chinese) |
| [docs/](../../docs/decisions.md) | [Decisions](../../docs/decisions.md) · [Declined](../../docs/declined.md) (in Chinese) |

</details>
