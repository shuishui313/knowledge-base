# Prompt 模板库

本目录收录 8 个可复用的 Prompt 模板，覆盖研发、产品、运营等常见工作场景。新模板和多数现有文件使用 `Role / Task / Requirements / Output Format`，可变部分用 `{variable}` 占位。`handoff.md` 与 `term-research.md` 是变体，见下文。

**中文** | [English](README.en.md)

[模板](#templates) · [结构](#structure) · [用法](#usage) · [注意](#notes)

<a id="templates"></a>

## 模板列表

| 模板 | 场景 | 适用对象 | 文件 |
|------|------|---------|------|
| 代码审查 Code Review | 审查代码质量、安全与性能，输出分级问题清单与修复建议 | 研发 / 技术负责人 | [code-review.md](code-review.md) |
| PRD 需求文档 | 将业务想法转化为结构完整的 PRD，含功能需求、验收标准、里程碑 | 产品经理 | [prd.md](prd.md) |
| 测试用例 Test Cases | 基于功能描述设计全覆盖测试用例，含需求追踪矩阵 | 测试工程师 | [test-cases.md](test-cases.md) |
| 竞品分析 Competitor Analysis | 系统分析竞品定位、功能、商业模式与优劣势，输出策略建议 | 产品 / 市场 / 运营 | [competitor-analysis.md](competitor-analysis.md) |
| 数据分析 Data Analysis | 基于数据完成指标拆解、趋势与异常分析，输出可执行结论 | 数据分析师 / 运营 | [data-analysis.md](data-analysis.md) |
| 会议纪要 Meeting Minutes | 将会议记录整理为结构化纪要，含决议与行动项追踪 | 全员 | [meeting-minutes.md](meeting-minutes.md) |
| 专业名词深度研习 Term Research | 对专业名词做深度调研，输出概念定义、研究与业界动态、趋势和学习路径 | 学习者 / 研究者 / 内容创作者 | [term-research.md](term-research.md) |
| 交接文档 HANDOFF | 会话结束时生成结构化交接，记录进度、遗留问题与关键上下文，方便下次续接 | 全员 / 项目协作 | [handoff.md](handoff.md) |

<a id="structure"></a>

## 模板结构说明

四个字段是：

- **Role（角色）**：定义 AI 扮演的专业角色与能力边界
- **Task（任务）**：写清要完成的任务和输入材料
- **Requirements（要求）**：输出必须遵守的结构、质量和约束
- **Output Format（输出格式）**：规定可直接落地的输出骨架

`handoff.md` 与 `term-research.md` 的标题用了同一意图的变体（中间段和 `Output Requirements`）。新模板跟上面四个字段，对照 [code-review.md](code-review.md)。

<a id="usage"></a>

## 使用方法

1. **复制模板**：把对应 `.md` 的正文复制到对话或 Prompt 编辑器
2. **替换占位符**：把 `{variable}` 换成实际内容（如 `{code_snippet}`、`{meeting_notes}`）
3. **按需裁剪**：可增删 `Requirements` 与 `Output Format` 的条目，四个字段保持不动
4. **二次定制**：要改语气或深度时，在 `Role` 或 `Requirements` 里追加约束（如「控制在 500 字内」「面向非技术读者」）

<a id="notes"></a>

## 注意事项

- 模板默认以中文为主，保留必要英文术语；需要英文输出时，在 `Task` 或 `Requirements` 里写明
- 输入真实代码、用户信息或财务数据前先脱敏
- 高频且效果稳定的模板，建议沉淀回本目录，并同时更新本文件和 `README.en.md` 的表。步骤见 [prompt-template](../examples/recipes/prompt-template/README.md)
- 只链接本目录里存在的文件。`email-draft.md` 已删除，不要写回表里

*（内容由AI生成，仅供参考）*

<details>
<summary>仓库目录</summary>

| 目录 | 说明 |
|------|------|
| [notes/ai-glossary/](../notes/ai-glossary/README.md) | AI 名词与技术科普 |
| [notes/ai-algorithms/](../notes/ai-algorithms/README.md) | AI 算法短课 |
| [notes/hk-fde/](../notes/hk-fde/README.md) | 香港 FDE 短课 |
| [prompt-templates/](README.md) | Prompt 模板，8 个文件（本目录） |
| [examples/recipes/](../examples/recipes/README.md) | 加短课、笔记、算法、模板的步骤 |
| [skills/knowledge-base/SKILL.md](../skills/knowledge-base/SKILL.md) | 代理维护手册 |
| [docs/](../docs/decisions.md) | [已采纳](../docs/decisions.md) · [明确不做](../docs/declined.md) |

</details>
