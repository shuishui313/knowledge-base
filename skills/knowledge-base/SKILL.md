---
name: knowledge-base
description: Maintain shuishui313/knowledge-base. Use when adding or editing Hong Kong FDE lessons, AI glossary notes, AI algorithm notes, prompt templates, bilingual README indexes, or repo conventions. Read docs/decisions.md and docs/declined.md before changing structure.
---

# 维护 knowledge-base

本手册给要改这个仓库的代理。正文是简体中文。先读 [docs/decisions.md](../../docs/decisions.md) 和 [docs/declined.md](../../docs/declined.md)，再读 [AGENTS.md](../../AGENTS.md)。三份都是中文。

## 动手前

1. `git fetch origin main`，在最新 main 上看文件。本地快照可能落后。
2. 任务写明直接推 main 时，在 `main` 上提交并 `git push origin main`。没写明就不要擅自推 main。
3. 只改本仓库。不要改 EveryNews、MediaMgDashboard、ruflo。
4. 不编造链接。索引里的每一行都要指向现存文件。`prompt-templates/email-draft.md` 已删除，不要写回去。

## 双语索引

主要索引用成对的 `README.md` 与 `README.en.md`。

- 中文顶栏：`**中文** | [English](README.en.md)`
- 英文顶栏：`[中文](README.md) | **English**`
- 标题下：一行价值说明、语言切换、锚点导航。锚点 id 必须在本页存在
- 英文页链到中文正文时加 `(in Chinese)`
- 不用 details 做语言切换。details 只用于 `参考答案` 和文末目录表
- 加一篇内容时，中英索引一起更新

需要改的索引：仓库根、`notes/hk-fde/`、`notes/ai-glossary/`、`notes/ai-algorithms/`、`prompt-templates/`。

## 四种内容

| 内容 | 放哪 | 步骤 |
|------|------|------|
| FDE 短课 | `notes/hk-fde/` | [examples/recipes/fde-daily-lesson](../../examples/recipes/fde-daily-lesson/README.md) |
| AI 科普笔记 | `notes/ai-glossary/` | [examples/recipes/ai-glossary-note](../../examples/recipes/ai-glossary-note/README.md) |
| AI 算法笔记 | `notes/ai-algorithms/` | [examples/recipes/ai-algorithm-note](../../examples/recipes/ai-algorithm-note/README.md) |
| Prompt 模板 | `prompt-templates/` | [examples/recipes/prompt-template](../../examples/recipes/prompt-template/README.md) |

FDE 短课顺序：场景 → 概念 → 香港落地例子 → 小练习 → 两道自测，然后 `<details><summary>参考答案</summary>`。

AI 算法笔记先写适用场景和不适用场景，然后是场景 → 概念 → 香港落地例子 → 小练习 → 两道自测，再收起参考答案。索引表要有适用场景列。

新模板沿用 `Role / Task / Requirements / Output Format`，对照 `prompt-templates/code-review.md`。

## 编号

每篇 FDE 短课、AI 笔记和 AI 算法笔记都有稳定编号。编号写进文件名，也写在文首，并出现在该系列两份索引的 `编号` / `No.` 列。新的一篇用该系列下一个编号。已分配的编号不复用、不重排。

- FDE：`FDE-NN-YYYY-MM-DD-主题简述.md`。`NN` 与 Day 相同，两位数字。Day 1 是 `FDE-01`。文首写法：`**FDE-05** · **2026-11-06** · Day 5 · **主题板块** 岗位本身 · **难度** 进阶`。
- AI：`AI-NN-中文名(English).md`。`NN` 按索引里已有收录日期从早到晚，两位数字。第一篇是 `AI-01`。文首只写编号，例如 `**AI-01**`。笔记原来没有日期行时，不要为了编号补一行日期。
- ALG：`ALG-NN-中文名(English).md`。`NN` 是课序，两位数字。第一篇是 `ALG-01`。文首写法：`**ALG-01** · **2026-11-06** · **分类** 回归 · **难度** 入门 · **面试频率** 极高`。

## 延伸观看

相关 YouTube 是可选项，放在 `延伸观看`（英文索引里称 Related watching）。

- 同一系列同一天最多 2 条
- 只收相对热门的 YouTube 解说、一节短课，或有见解的分享
- 普通的长课、泛泛的网课不收
- 没有合格的就不要这一节，不凑数
- 不把播放量写进文件

FDE 短课和 AI 算法笔记放在参考答案之后、系列导航之前。AI 笔记放在一句话总结之后。

## 诚实

本仓库没有靠运行结果才能成立的脚本。没有跑过的检查，不要写成测试通过。

## English

Read `docs/decisions.md` and `docs/declined.md` first; both are in Chinese. Keep bilingual indexes as two files with the top-bar switcher above, including `notes/ai-algorithms/`. FDE lessons use the five-part order plus a collapsed 参考答案. Algorithm notes start with applicable and not-applicable scenarios, then the same lesson shape, and the index keeps an applicable-scenarios column. Filenames include the serial from the start: `FDE-NN-YYYY-MM-DD-主题简述.md` (NN matches Day), `AI-NN-中文名(English).md` (NN follows the index date), `ALG-NN-中文名(English).md` (NN is the lesson order). Never reuse or renumber an assigned serial. Optional YouTube links go in `延伸观看` (Related watching): at most 2 per series per day, only a relatively popular explainer, one short lesson, or an insightful take; skip ordinary long or generic courses; omit the section if none qualify; do not write view counts. Update both indexes when you add a file. Do not invent links. Do not edit EveryNews, MediaMgDashboard, or ruflo from this repo. Push `main` only when the task says to, after fetching `origin main`.
