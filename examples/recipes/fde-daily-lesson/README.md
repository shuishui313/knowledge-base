# 每日 FDE 短课

## 解决什么

把一节香港 FDE 短课写成固定顺序，并让 `notes/hk-fde/` 的中英索引都能点到这篇。学习节奏大约每天 9:00 一节，那不是本仓库里的定时脚本。见 [docs/decisions.md](../../../docs/decisions.md)。

## 怎么用

1. 在 `notes/hk-fde/` 新建 `YYYY-MM-DD-主题板块-短标题.md`。Day 接索引最后一行加一。
2. 文首写日期、Day、主题板块、难度。现有写法：`**2026-11-05** · Day 4 · **主题板块** 交付与沟通 · **难度** 入门`。
3. 正文五个标题，按这个顺序：`场景`、`概念`、`香港落地例子`、`小练习`、`自测`。自测两题。
4. 自测后用 `<details><summary>参考答案</summary>` 收起答案。不要用 details 做中英切换。
5. 例子用虚拟、公开可见的场景。不写任何机构的内部材料。
6. 文末加上一篇链接和 [回到索引](../../../notes/hk-fde/README.md)。上一篇若写了「下一篇」，改成指向新文件。
7. 在 [README.md](../../../notes/hk-fde/README.md) 和 [README.en.md](../../../notes/hk-fde/README.en.md) 的表各加一行。英文那一行在链接后写 `(in Chinese)`。

对照这篇：[客户说「差不多就行」时怎么对齐范围](../../../notes/hk-fde/2026-11-05-交付沟通-差不多就行时对齐范围.md)。

## 要改哪

| 文件 | 改什么 |
|------|--------|
| `notes/hk-fde/YYYY-MM-DD-….md` | 新短课 |
| 上一篇短课文末 | 系列里的「下一篇」，如果上一篇有这一行 |
| `notes/hk-fde/README.md` | 中文索引加一行 |
| `notes/hk-fde/README.en.md` | 英文索引加一行，链到中文正文 |

索引：[notes/hk-fde](../../../notes/hk-fde/README.md)。
