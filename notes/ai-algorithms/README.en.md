# AI algorithms

Common machine-learning algorithms that Hong Kong FDE hiring actually uses, from easier to harder. Each note is about a 5–8 minute read: a hiring opening, when it fits and when it does not, then scene, concept, Hong Kong example, a one-minute 「面试怎么说」, a short drill, and two quiz questions. Standard answers stay collapsed after the quiz. Try them before you open them. Related watching is optional: at most 2 YouTube videos per series per day, and only a relatively popular explainer, one short lesson, or an insightful take. Ordinary long or generic courses stay out. If nothing qualifies, omit the section. Do not write view counts.

[中文](README.md) | **English**

[Lessons](#lessons) · [Order](#order) · [Conventions](#conventions)

Lesson bodies are in Simplified Chinese. This page is the bilingual index. Examples use plausible public scenes and do not describe any real organization's internal material.

<a id="lessons"></a>

## Index

| No. | Category | Level | Interview frequency | Applicable scenarios | Title |
|-----|----------|-------|---------------------|----------------------|-------|
| ALG-01 | Regression | Beginner | High in finance; deriving the formula is rare in FDE write-ups | Predict a continuous number (premium, limit, handling days). In-house bank or insurer: an explainable baseline. AI-native company or cloud platform: a comparison baseline, not a derivation | [Linear regression](ALG-01-线性回归(Linear-Regression).md) (in Chinese) |
| ALG-02 | Classification | Beginner | High in banking and insurance; deriving maximum likelihood is rare in FDE write-ups | Predict the probability of a yes-or-no outcome (manual review, fraud, delay). Bank or insurer: thresholds, recall, and odds ratios. AI product company: a classification baseline to compare against | [Logistic regression](ALG-02-逻辑回归(Logistic-Regression).md) (in Chinese) |
| ALG-03 | Classification / regression | Beginner | Medium: asked as explainable rules and the base of tree models; hand-computing Gini is rare in FDE write-ups | Route cases through a few conditions (send a claim to a reviewer, which condition combinations go wrong). In-house bank or insurer: auditable rules. Consulting firm: compare with the client's existing rules engine | [Decision tree](ALG-03-决策树(Decision-Tree).md) (in Chinese) |
| ALG-04 | Classification / regression | Beginner | Medium-low: asked as a baseline and as the idea behind similar-case lookup; hand-coding it is rare in FDE write-ups | Judge a case by its most similar past cases (similar claims, similar complaints). In-house bank or insurer: show reviewers similar past cases. AI product company: baseline and its link to vector search | [K-nearest neighbors](ALG-04-K近邻(K-Nearest-Neighbors).md) (in Chinese) |
| ALG-05 | Clustering (unsupervised) | Beginner | Medium: asked how to group unlabeled data and how to pick K; hand-coding the loop is rare in FDE write-ups | Group users or cases when there are no labels (customer segments, delivery-stop types). In-house bank or insurer: name the groups with the business. Consulting: do the groups mean anything | [K-Means](ALG-05-K-Means(K-Means).md) (in Chinese) |

<a id="order"></a>

## Study order

ALG-01 linear regression, ALG-02 logistic regression, ALG-03 decision tree, ALG-04 k-nearest neighbors, and ALG-05 K-Means are written. The items below are planned and have no files yet, so this page does not link them:

- ALG-06 random forest
- ALG-07 gradient boosting / XGBoost
- ALG-08 naive Bayes
- Then: SVM, PCA, neural networks and backpropagation, overfitting and regularization, CNN, attention / Transformer

Serials after ALG-08 are assigned when those notes are written, in lesson order. An assigned serial is not reused or renumbered.

<a id="conventions"></a>

## Conventions

- One Markdown file per algorithm. Generate the filename with the serial from the start: `ALG-NN-中文名(English).md`. `NN` is the lesson order, zero-padded to two digits. A new note takes the next number. Never reuse or renumber an assigned serial.
- The header carries the serial, date, category, level, and interview frequency. The same serial appears in this table's `No.` column and in `README.md` as `编号`. Example: `**ALG-01** · **2026-11-06** · **分类** 回归 · **难度** 入门 · **面试频率** 金融场景高；纯公式推导在 FDE 面经里少见`.
- A hiring opening comes first, then applicable and not-applicable scenarios, scene, concept, Hong Kong example, 「面试怎么说」, drill, and two quiz questions. Answers go in `<details><summary>参考答案</summary>`. Lead with Hong Kong FDE hiring. Employers follow the four Hong Kong FDE types: (1) AI-native or product companies (e.g. voice AI, LLM platforms), (2) big-tech cloud and platforms (e.g. BytePlus, Alibaba Cloud), (3) consulting and systems integrators (e.g. Deloitte), (4) in-house FDE teams at enterprises (banking and insurance, property, funds). Do not force a four-row comparison table into every note; use one only where it really helps, at most one per note. Public interview write-ups are only patterns you can check, labeled 「公开面经里的常见问法」; do not invent a quote, a candidate story, or a verbatim question from a named bank or insurer. A short 「拓展补充」 may follow. 「面试怎么说」 is about 45–60 seconds of English a candidate can say, plus one Chinese tip: explain it in the client's usual language (Cantonese or Mandarin) and write the conclusion down in English. Keep two quiz questions; one may ask how the answer changes for a different employer type. Preview the next lesson by title only. Do not create the file or link it until it exists.
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
