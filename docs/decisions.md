# 已采纳的决定

这个知识库已经定下来的做法。正文是简体中文。

记录日期：2026-11-05。文件名编号与 AI 算法两节补于 2026-11-06。招聘口径同日补上。下面是已经在用的决定，不是会议纪要。

## 知识库放在 shuishui313

个人学习库是 [shuishui313/knowledge-base](https://github.com/shuishui313/knowledge-base)。不放到 gsspai Organization。

## 双语用双文件

中英文各一份 README，顶栏链接切换，做法与 agent-autoloop 相同。

- 中文：`**中文** | [English](README.en.md)`
- 英文：`[中文](README.md) | **English**`

`<details>` 不用于语言切换。它只用于短课（FDE 与 AI 算法）的参考答案，以及主要 README 末尾的仓库目录。

## FDE 短课

放在 `notes/hk-fde/`。一篇一个 Markdown。顺序：场景 → 概念 → 香港落地例子 → 面试怎么说 → 小练习 → 两道自测。自测后用 `<details><summary>参考答案</summary>`。例子用虚拟、公开可见的场景。

## AI 算法

放在 `notes/ai-algorithms/`。一篇一个算法，从易到难写香港 FDE 招聘里用得上的模型。顺序：招聘切入 → 适用场景与不适用场景 → 场景 → 概念 → 香港落地例子 → 面试怎么说 → 小练习 → 两道自测。自测后用 `<details><summary>参考答案</summary>`。索引用适用场景列。例子用虚拟、公开可见的场景。还没写的下一篇只预告题目，不建文件、不放链接。

## 笔记以香港 FDE 招聘为主

FDE 短课、AI 笔记、AI 算法笔记先写香港 FDE 招聘要考的那一层。答案按公司类型分开：虚拟银行/保险、物流、公营柜面、AI 产品或解决方案公司。一种公司写深，其余用一张对照表。公开面经只标「公开面经里的常见问法」，不编造具名机构的原话、候选人故事或逐字题。可以有短的拓展补充。每篇有约一分钟的「面试怎么说」：英文口语句，现场用粤语讲清楚，用英文把确认写下来。自测两题，其中一题换成另一类公司。例子仍是虚构的公开场景，不写真实公司的招聘原文。AI 笔记可以保持自己的分节，这三样仍要在。

## 文件名带编号

笔记文件名从一开始就带稳定编号，按号就能找到文件。同一编号写在文首，以及该系列两份索引的 `编号` / `No.` 列。已分配的编号不复用、不重排。

- FDE：`FDE-NN-YYYY-MM-DD-主题简述.md`，`NN` 与 Day 相同
- AI 笔记：`AI-NN-中文名(English).md`，`NN` 按索引收录日期
- AI 算法：`ALG-NN-中文名(English).md`，`NN` 为课序

## 每日节奏

大约 9:00 一节 FDE 短课，大约 9:30 一篇 AI 科普笔记。这是学习节奏。本仓库里没有对应的定时脚本。

## ruflo 只做贡献者

[ruvnet/ruflo](https://github.com/ruvnet/ruflo) 不在本仓库里改。若参与，只在那个仓库以贡献者身份做。EveryNews 和 MediaMgDashboard 同样不从这里改。

不做的事见 [declined.md](declined.md)。代理约定见 [../AGENTS.md](../AGENTS.md)。
