---
name: knowledge-base
description: Maintain shuishui313/knowledge-base. Use when adding or editing Hong Kong FDE lessons, AI glossary notes, prompt templates, bilingual README indexes, or repo conventions. Read docs/decisions.md and docs/declined.md before changing structure.
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

需要改的索引：仓库根、`notes/hk-fde/`、`notes/ai-glossary/`、`prompt-templates/`。

## 三种内容

| 内容 | 放哪 | 步骤 |
|------|------|------|
| FDE 短课 | `notes/hk-fde/` | [examples/recipes/fde-daily-lesson](../../examples/recipes/fde-daily-lesson/README.md) |
| AI 科普笔记 | `notes/ai-glossary/` | [examples/recipes/ai-glossary-note](../../examples/recipes/ai-glossary-note/README.md) |
| Prompt 模板 | `prompt-templates/` | [examples/recipes/prompt-template](../../examples/recipes/prompt-template/README.md) |

FDE 短课顺序：场景 → 概念 → 香港落地例子 → 小练习 → 两道自测，然后 `<details><summary>参考答案</summary>`。

新模板沿用 `Role / Task / Requirements / Output Format`，对照 `prompt-templates/code-review.md`。

## 诚实

本仓库没有靠运行结果才能成立的脚本。没有跑过的检查，不要写成测试通过。

## English

Read `docs/decisions.md` and `docs/declined.md` first; both are in Chinese. Keep bilingual indexes as two files with the top-bar switcher above. FDE lessons use the five-part order plus a collapsed 参考答案. Update both indexes when you add a file. Do not invent links. Do not edit EveryNews, MediaMgDashboard, or ruflo from this repo. Push `main` only when the task says to, after fetching `origin main`.
