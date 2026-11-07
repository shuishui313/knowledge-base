# 给代理的约定

本文件说明代理怎样改 [shuishui313/knowledge-base](https://github.com/shuishui313/knowledge-base)。正文是简体中文。短英文摘要在文末。

先读再改：

1. [docs/decisions.md](docs/decisions.md)
2. [docs/declined.md](docs/declined.md)
3. 本文件

## 双语 README

索引用两个文件：`README.md`（中文）和 `README.en.md`（英文）。

- 中文顶栏：`**中文** | [English](README.en.md)`
- 英文顶栏：`[中文](README.md) | **English**`
- 标题下面的顺序：一行价值说明、语言切换、指向本页真实标题的锚点导航
- 不用 `<details>` 做语言切换
- `<details>` 只用在两处：短课（FDE 与 AI 算法）的 `<summary>参考答案</summary>`，以及主要 README 末尾的目录表（中文摘要是 `仓库目录`，英文摘要是 `Repository layout`）
- 英文页链到只有中文的正文时，链接旁写 `(in Chinese)`
- 改索引时两份一起改。不写仓库里不存在的链接

## FDE 短课

路径：`notes/hk-fde/`。一课一个文件：`FDE-NN-YYYY-MM-DD-主题简述.md`（`NN` 与 Day 相同，两位数字）。编号不复用、不重排。课程顺序按 [docs/fde-syllabus.md](docs/fde-syllabus.md)。

每课的原稿来自每天 9:00 的 FDE 学习推送，入库时只做格式整理：文首元数据行，去掉「回顾」，复述题变成「自测」，补第二题和参考答案。

顺序：场景 → 类比 → 原理（解决什么问题、怎么工作、会在哪里坏）→ FDE 视角 → 面试怎么问 → 一句话带走 → 自测两题，答案收在 `<details><summary>参考答案</summary>`。第 2 题换一类雇主（AI 原生 / 产品公司、大厂云与平台、咨询与系统集成、甲方企业内部）再问。

例子用虚构的香港场景，不写任何机构的内部材料，不编造面经、公司原话和数字。写法要像人写的：短句、少套话、不重复同一个词。

新增后更新 `notes/hk-fde/README.md` 和 `README.en.md`，并把上一篇文末的「下一篇」接上。步骤见 [examples/recipes/fde-daily-lesson](examples/recipes/fde-daily-lesson/README.md)。

## 笔记和模板

- AI 笔记放 `notes/ai-glossary/`。文件名从一开始就带编号：`AI-NN-中文名(English).md`（`NN` 按索引收录日期）。分节可以不同，但先写香港 FDE 招聘要考的那一层，并带上「面试怎么说」和恰好两道自测。更新该目录两份索引。步骤见 [ai-glossary-note](examples/recipes/ai-glossary-note/README.md)
- AI 算法放 `notes/ai-algorithms/`。一篇一个算法。文件名 `ALG-NN-中文名(English).md`（`NN` 为课序）。招聘切入写在正文最前，然后是适用场景，索引用适用场景列。还没写的下一篇只预告题目，不建文件、不放链接。更新该目录两份索引。步骤见 [ai-algorithm-note](examples/recipes/ai-algorithm-note/README.md)
- 新的 Prompt 模板放 `prompt-templates/`，沿用 `Role / Task / Requirements / Output Format`（对照 `code-review.md`）。`handoff.md` 和 `term-research.md` 是已有变体，不要为了统一标题去改它们，除非任务明确要求。更新该目录两份索引。步骤见 [prompt-template](examples/recipes/prompt-template/README.md)
- `prompt-templates/email-draft.md` 已经删除。文件不在就不要写回索引

## 公开阅读站

公开阅读站是 [Knowledge Base](https://shuishui313.github.io/knowledge-base/)。课文只改 `notes/`，不要为了网页改写课文。首页不要加「最近更新」，不要加学习进度。不要给大标题做入场位移动画。芯片和目录卡片不展示发布日期。Day 和阅读时长先不动。界面与动效的完整约定见 [skills/knowledge-base/SKILL.md](skills/knowledge-base/SKILL.md)。

## 推送

任务写明直接推 `main` 时：先 `git fetch origin main`，在最新 `main` 上提交，再 `git push origin main`。不要为了这种任务另开分支。任务没写推 main 时，按调用方的分支约定，不擅自推 main。

笔记本身没有单独的测试脚本。`site/` 可以构建。不要写「已在某环境测试通过」，除非命令真的跑过，并写明跑了什么、没跑什么。

## 不要从本仓库改的项目

- [EveryNews](https://github.com/shuishui313/EveryNews)
- [MediaMgDashboard](https://github.com/shuishui313/MediaMgDashboard)（也称 MediaMg）
- [ruflo](https://github.com/ruvnet/ruflo)：只在那个仓库以贡献者身份参与。维护本知识库时不改它

## English

The body above is Simplified Chinese. Use separate `README.md` and `README.en.md` files. Switch them with the top-bar links, never with a details widget. FDE lessons go scenario, analogy, how it works, FDE view, interview question, one-line takeaway, then two quiz questions, with answers inside `<details><summary>参考答案</summary>`; they follow docs/fde-syllabus.md. Algorithm notes open with hiring, then applicable and not-applicable scenarios, then the same lesson shape. Glossary notes keep their own headings and still lead with hiring, plus 「面试怎么说」 and exactly two quiz questions. All three lead with Hong Kong FDE hiring and differ by company type (AI-native product companies, big-tech cloud platforms, consulting and system integrators, in-house teams); use a comparison table only when it helps. Label public interview patterns 「公开面经里的常见问法」; do not invent a quote, candidate story, or verbatim question from a named bank or insurer. One quiz question switches company type. Do not create or link an unwritten next lesson. Filenames include the serial from the start: `FDE-NN-YYYY-MM-DD-主题简述.md`, `AI-NN-中文名(English).md`, `ALG-NN-中文名(English).md`. Never reuse or renumber an assigned serial. Do not invent links. When the task says to push `main`, fetch `origin main` first and push that branch. When you add a note, lesson, algorithm, or template, update both README indexes. Do not change EveryNews, MediaMgDashboard, or ruflo from this repo. The public site is Knowledge Base at https://shuishui313.github.io/knowledge-base/; do not rewrite notes for the web, do not add a latest-updates module or progress UI, do not animate the hero title on entrance, do not show publish dates in chrome, and leave Day labels and reading time as they are for now; the full interface rules are in skills/knowledge-base/SKILL.md.
