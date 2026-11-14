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
| AI-05 | 评测 | Evaluation | 2026-11-08 | [评测（Evaluation）](AI-05-评测(Evaluation).md) |
| AI-06 | 提示词工程 | Prompt Engineering | 2026-11-09 | [提示词工程（Prompt Engineering）](AI-06-提示词工程(Prompt-Engineering).md) |
| AI-07 | 微调 | Fine-Tuning | 2026-11-10 | [微调（Fine-Tuning）](AI-07-微调(Fine-Tuning).md) |
| AI-08 | 嵌入与向量检索 | Embedding | 2026-11-11 | [嵌入与向量检索（Embedding）](AI-08-嵌入与向量检索(Embedding).md) |
| AI-09 | 提示注入 | Prompt Injection | 2026-11-12 | [提示注入（Prompt Injection）](AI-09-提示注入(Prompt-Injection).md) |
| AI-10 | 上下文工程 | Context Engineering | 2026-11-13 | [上下文工程（Context Engineering）](AI-10-上下文工程(Context-Engineering).md) |
| AI-11 | 结构化输出 | Structured Output | 2026-11-14 | [结构化输出（Structured Output）](AI-11-结构化输出(Structured-Output).md) |

<a id="conventions"></a>

## 收录约定

- 每篇笔记一个 Markdown 文件，直接放在本目录。文件名从一开始就带编号，并保留中英术语：`AI-NN-中文名(English).md`（如 `AI-01-AI幻觉(Hallucination).md`）。`NN` 按本表收录日期从早到晚，两位数字。新笔记用下一个编号。已分配的编号不复用、不重排。笔记原来没有日期行时，不要为了编号补一行日期
- 同一编号写在文首，并出现在本文件和 `README.en.md` 的 `编号` / `No.` 列。同一主题的后续笔记用下一个 `AI-NN`，文件名仍是 `AI-NN-中文名(English).md`
- 正文先写香港 FDE 招聘要考的那一层，再写定义和用法。不必改成短课的五个标题。雇主按香港 FDE 的四类来分：① AI 原生/产品公司（如语音 AI、LLM 平台）② 大厂云与平台（如 BytePlus、阿里云）③ 咨询与系统集成（如 Deloitte）④ 甲方企业内部 FDE（银行保险、地产、基金）。不必每篇都放四行对照表，真正有帮助时才用，每篇最多一张。公开面经只写核对得了的常见问法，并标明「公开面经里的常见问法」；不编造某家银行或保险公司的原话、候选人故事或逐字题。可以有短的「拓展补充」。每篇有「面试怎么说」：约 45–60 秒候选人可以说出口的英文，加一句中文提示，写明用客户习惯的语言（粤语或普通话）讲清楚，用英文把结论写下来。自测恰好两题，其中一题可以问面试官换成另一类雇主时答案怎么变。自测后用 `<details><summary>参考答案</summary>`
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
