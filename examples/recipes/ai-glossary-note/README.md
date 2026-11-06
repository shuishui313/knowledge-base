# AI 科普笔记

## 解决什么

加一篇 AI 名词或技术笔记，并让 `notes/ai-glossary/` 的中英索引都能点到它。学习节奏大约每天 9:30 一篇，那不是本仓库里的定时脚本。见 [docs/decisions.md](../../../docs/decisions.md)。

## 怎么用

1. 在 `notes/ai-glossary/` 放一个 Markdown。文件名从一开始就带编号，并保留中英术语：`AI-NN-中文名(English).md`，例如 `AI-01-AI幻觉(Hallucination).md`。`NN` 按索引收录日期从早到晚。下一篇用最后一个编号加一。已分配的编号不复用、不重排。同一主题的后续篇也用下一个 `AI-NN`，文件名仍是这个格式。
2. 文首写稳定编号 `**AI-NN**`，两位数字，与文件名里的编号相同。笔记原来没有日期行时，不要为了编号补一行日期。
3. 正文用简体中文。现成笔记的分节并不相同，按题目写清楚定义和用法即可，不要为了凑同一套标题去改旧笔记。
4. 相关 YouTube 可选。放在一句话总结之后，标题用 `延伸观看`。同一系列同一天最多 2 条。只收相对热门的解说、一节短课，或有见解的分享。普通的长课、泛泛的网课不收。没有合格的就省略这一节，不凑数。不写播放量。
5. 在 [README.md](../../../notes/ai-glossary/README.md) 和 [README.en.md](../../../notes/ai-glossary/README.en.md) 的表各加一行：编号、主题、术语、日期、链接。英文那一行在链接后写 `(in Chinese)`。
6. 只链接已经放进目录的文件。

对照：[AI 幻觉](../../../notes/ai-glossary/AI-01-AI幻觉(Hallucination).md)、[RAG](../../../notes/ai-glossary/AI-02-RAG检索增强生成(RAG).md)、[工具调用](../../../notes/ai-glossary/AI-03-工具调用(Tool-Calling).md)。

## 要改哪

| 文件 | 改什么 |
|------|--------|
| `notes/ai-glossary/<笔记>.md` | 新笔记 |
| `notes/ai-glossary/README.md` | 中文索引加一行 |
| `notes/ai-glossary/README.en.md` | 英文索引加一行，链到中文正文 |

索引：[notes/ai-glossary](../../../notes/ai-glossary/README.md)。
