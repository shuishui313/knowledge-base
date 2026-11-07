# AI Glossary · AI 笔记系列

面向持续积累的 AI 名词与技术科普。正文为简体中文，本页是索引。

**中文** | [English](README.en.md)

[索引](#index) · [约定](#conventions)

<a id="index"></a>

## 主题索引

| 编号 | 主题 | 术语 | 收录日期 | 笔记 |
|------|------|------|---------|------|
| AI-01 | 幻觉 | Hallucination | 2026-10-18 | [AI 幻觉（Hallucination）](AI-01-AI幻觉(Hallucination).md) |
| AI-02 | 检索增强生成 | RAG | 2026-11-05 | [RAG 检索增强生成（RAG）](AI-02-RAG检索增强生成(RAG).md) |
| AI-03 | 工具调用 | Tool Calling | 2026-11-06 | [工具调用（Tool Calling）](AI-03-工具调用(Tool-Calling).md) |
| AI-04 | 智能体 | Agent | 2026-11-07 | [智能体（Agent）](AI-04-智能体(Agent).md) |

<a id="conventions"></a>

## 收录约定

- 每篇笔记一个 Markdown 文件，直接放在本目录。文件名从一开始就带编号，并保留中英术语：`AI-NN-中文名(English).md`（如 `AI-01-AI幻觉(Hallucination).md`）。`NN` 按本表收录日期从早到晚，两位数字。新笔记用下一个编号。已分配的编号不复用、不重排。笔记原来没有日期行时，不要为了编号补一行日期
- 同一编号写在文首，并出现在本文件和 `README.en.md` 的 `编号` / `No.` 列。同一主题的后续笔记用下一个 `AI-NN`，文件名仍是 `AI-NN-中文名(English).md`
- 正文先写香港 FDE 招聘要考的那一层，再写定义和用法。不必改成短课的五个标题。答案按公司类型分开：虚拟银行/保险、物流、公营柜面、AI 产品或解决方案公司。一种公司写透，其余用一张对照表。公开面经只写核对得了的常见问法，并标明「公开面经里的常见问法」；不编造某家银行或保险公司的原话、候选人故事或逐字题。可以有短的「拓展补充」。每篇有约一分钟的「面试怎么说」：候选人可以说出口的英文，并写明现场用粤语讲清楚、用英文把确认写下来。自测恰好两题，其中一题要问面试官换成另一类公司时答案怎么变。自测后用 `<details><summary>参考答案</summary>`
- 相关 YouTube 可选，放在一句话总结之后的 `延伸观看`。同一系列同一天最多 2 条。只收相对热门的解说、一节短课，或有见解的分享。普通的长课、泛泛的网课不收。没有合格的就省略这一节，不凑数。不写播放量
- 新增笔记时：放入文件，并在本文件和 `README.en.md` 的表里各加一行。步骤见 [ai-glossary-note](../../examples/recipes/ai-glossary-note/README.md)

<details>
<summary>仓库目录</summary>

| 目录 | 说明 |
|------|------|
| [notes/ai-glossary/](README.md) | AI 名词与技术科普（本目录） |
| [notes/ai-algorithms/](../../notes/ai-algorithms/README.md) | AI 算法短课 |
| [notes/hk-fde/](../../notes/hk-fde/README.md) | 香港 FDE 短课 |
| [prompt-templates/](../../prompt-templates/README.md) | Prompt 模板，8 个文件 |
| [examples/recipes/](../../examples/recipes/README.md) | 加短课、笔记、算法、模板的步骤 |
| [skills/knowledge-base/SKILL.md](../../skills/knowledge-base/SKILL.md) | 代理维护手册 |
| [docs/](../../docs/decisions.md) | [已采纳](../../docs/decisions.md) · [明确不做](../../docs/declined.md) |

</details>
