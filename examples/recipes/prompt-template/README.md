# Prompt 模板

## 解决什么

加一个可复用的 Prompt，并让 `prompt-templates/` 的中英索引与目录里的文件一致。现在索引里是 8 个文件。`email-draft.md` 已删除，不要写回索引。

## 怎么用

1. 在 `prompt-templates/` 新建 `kebab-case.md`。
2. 新模板用四个字段：`Role`、`Task`、`Requirements`、`Output Format`。可变内容用 `{variable}`。对照 [code-review.md](../../../prompt-templates/code-review.md)。
3. `handoff.md` 和 `term-research.md` 用了另一套标题（中间段加 `Output Requirements`）。那是已有变体。新模板跟 `code-review.md`，不要为了统一去改这两篇，除非任务明确要求。
4. 在 [README.md](../../../prompt-templates/README.md) 和 [README.en.md](../../../prompt-templates/README.en.md) 的表各加一行。英文那一行在文件链接后写 `(in Chinese)`。根目录 README 若写了模板个数，两份一起改成数完文件后的数字。
5. 模板正文默认中文。需要英文输出时，在 Task 或 Requirements 里写明。

## 要改哪

| 文件 | 改什么 |
|------|--------|
| `prompt-templates/<name>.md` | 新模板 |
| `prompt-templates/README.md` | 中文表加一行 |
| `prompt-templates/README.en.md` | 英文表加一行，链到中文正文 |
| `README.md` 与 `README.en.md`（仓库根） | 只有写了模板个数时才改那个数字 |

索引：[prompt-templates](../../../prompt-templates/README.md)。
