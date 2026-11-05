# Gss 知识库

个人 AI / FDE 学习与模板总入口（账号：[shuishui313](https://github.com/shuishui313)）。

**中文** | [English](README.en.md)

[分区](#sections) · [相关项目](#related) · [维护约定](#conventions)

<a id="sections"></a>

## 内容分区

| 分区 | 说明 | 路径 |
|------|------|------|
| AI 科普笔记 | 每日一篇名词/技术科普 | [notes/ai-glossary](notes/ai-glossary/README.md) |
| 香港 FDE 短课 | 场景→概念→落地例子→练习→自测（含参考答案） | [notes/hk-fde](notes/hk-fde/README.md) |
| Prompt 模板 | Role / Task / Requirements / Output Format，目前 8 个 | [prompt-templates](prompt-templates/README.md) |

<a id="related"></a>

## 相关项目

| 项目 | 简介 | 仓库 |
|------|------|------|
| EveryNews | 每日 AI 新闻图文流水线 | [shuishui313/EveryNews](https://github.com/shuishui313/EveryNews) |
| MediaMgDashboard | 传媒管理看板 | [shuishui313/MediaMgDashboard](https://github.com/shuishui313/MediaMgDashboard) |

<a id="conventions"></a>

## 维护约定

- 新增 AI 笔记：写入 `notes/ai-glossary/`，并同时更新该目录的 `README.md` 与 `README.en.md`
- 新增 FDE 短课：写入 `notes/hk-fde/`，并同时更新该目录的 `README.md` 与 `README.en.md`
- 笔记正文用简体中文。目录索引用顶栏链接切换，中文是 `**中文** | [English](README.en.md)`，英文是 `[中文](README.md) | **English**`。不用 details 做语言切换
- 怎么加一篇：[examples/recipes](examples/recipes/README.md)。代理先读 [AGENTS.md](AGENTS.md)
- 本仓库只改这里的笔记、模板和约定。不从这里改 EveryNews、MediaMgDashboard、ruflo
- 仓库命名：`kebab-case`

<details>
<summary>仓库目录</summary>

| 目录 | 说明 |
|------|------|
| [notes/ai-glossary/](notes/ai-glossary/README.md) | AI 名词与技术科普 |
| [notes/hk-fde/](notes/hk-fde/README.md) | 香港 FDE 短课 |
| [prompt-templates/](prompt-templates/README.md) | Prompt 模板，8 个文件 |
| [examples/recipes/](examples/recipes/README.md) | 加短课、笔记、模板的步骤 |
| [skills/knowledge-base/SKILL.md](skills/knowledge-base/SKILL.md) | 代理维护手册 |
| [docs/](docs/decisions.md) | [已采纳](docs/decisions.md) · [明确不做](docs/declined.md) |

</details>
