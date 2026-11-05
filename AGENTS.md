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
- `<details>` 只用在两处：短课的 `<summary>参考答案</summary>`，以及主要 README 末尾的目录表（中文摘要是 `仓库目录`，英文摘要是 `Repository layout`）
- 英文页链到只有中文的正文时，链接旁写 `(in Chinese)`
- 改索引时两份一起改。不写仓库里不存在的链接

## FDE 短课

路径：`notes/hk-fde/`。一篇一个文件，文件名以日期开头。

顺序：场景 → 概念 → 香港落地例子 → 小练习 → 两道自测。自测后用 details 收起参考答案。

例子用虚拟、公开可见的场景（银行、仓库、柜面），不写任何机构的内部材料。

新增后更新 `notes/hk-fde/README.md` 和 `README.en.md`。若接上系列导航，补上一篇文末的「下一篇」。步骤见 [examples/recipes/fde-daily-lesson](examples/recipes/fde-daily-lesson/README.md)。对照：[2026-11-05 对齐范围](notes/hk-fde/2026-11-05-交付沟通-差不多就行时对齐范围.md)。

## 笔记和模板

- AI 笔记放 `notes/ai-glossary/`。文件名保留中英术语。更新该目录两份索引。步骤见 [ai-glossary-note](examples/recipes/ai-glossary-note/README.md)
- 新的 Prompt 模板放 `prompt-templates/`，沿用 `Role / Task / Requirements / Output Format`（对照 `code-review.md`）。`handoff.md` 和 `term-research.md` 是已有变体，不要为了统一标题去改它们，除非任务明确要求。更新该目录两份索引。步骤见 [prompt-template](examples/recipes/prompt-template/README.md)
- `prompt-templates/email-draft.md` 已经删除。文件不在就不要写回索引

## 推送

任务写明直接推 `main` 时：先 `git fetch origin main`，在最新 `main` 上提交，再 `git push origin main`。不要为了这种任务另开分支。任务没写推 main 时，按调用方的分支约定，不擅自推 main。

本仓库这次增加的是文档，没有可运行脚本。不要写「已在某环境测试通过」，除非命令真的跑过，并写明跑了什么、没跑什么。

## 不要从本仓库改的项目

- [EveryNews](https://github.com/shuishui313/EveryNews)
- [MediaMgDashboard](https://github.com/shuishui313/MediaMgDashboard)（也称 MediaMg）
- [ruflo](https://github.com/ruvnet/ruflo)：只在那个仓库以贡献者身份参与。维护本知识库时不改它

## English

The body above is Simplified Chinese. Use separate `README.md` and `README.en.md` files. Switch them with the top-bar links, never with a details widget. FDE lessons go scene, concept, Hong Kong example, drill, then two quiz questions, with answers inside `<details><summary>参考答案</summary>`. Do not invent links. When the task says to push `main`, fetch `origin main` first and push that branch. When you add a note, lesson, or template, update both README indexes. Do not change EveryNews, MediaMgDashboard, or ruflo from this repo.
