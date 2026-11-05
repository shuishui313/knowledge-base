# AI 科普笔记

## 解决什么

加一篇 AI 名词或技术笔记，并让 `notes/ai-glossary/` 的中英索引都能点到它。学习节奏大约每天 9:30 一篇，那不是本仓库里的定时脚本。见 [docs/decisions.md](../../../docs/decisions.md)。

## 怎么用

1. 在 `notes/ai-glossary/` 放一个 Markdown。文件名保留中英术语，例如 `AI幻觉(Hallucination).md`。同一主题的后续篇，文件名以日期开头，例如 `2026-10-19-幻觉(Hallucination).md`。
2. 正文用简体中文。两篇现成笔记的分节并不相同，按题目写清楚定义和用法即可，不要为了凑同一套标题去改旧笔记。
3. 在 [README.md](../../../notes/ai-glossary/README.md) 和 [README.en.md](../../../notes/ai-glossary/README.en.md) 的表各加一行：主题、术语、日期、链接。英文那一行在链接后写 `(in Chinese)`。
4. 只链接已经放进目录的文件。

对照：[AI 幻觉](../../../notes/ai-glossary/AI幻觉(Hallucination).md)、[RAG](../../../notes/ai-glossary/RAG检索增强生成(RAG).md)。

## 要改哪

| 文件 | 改什么 |
|------|--------|
| `notes/ai-glossary/<笔记>.md` | 新笔记 |
| `notes/ai-glossary/README.md` | 中文索引加一行 |
| `notes/ai-glossary/README.en.md` | 英文索引加一行，链到中文正文 |

索引：[notes/ai-glossary](../../../notes/ai-glossary/README.md)。
