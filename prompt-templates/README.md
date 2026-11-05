<!-- Bilingual via details (GitHub has no real JS tabs) -->

<details open>
<summary><strong>中文</strong></summary>

# Prompt 模板库

本目录收录 8 个可复用的 Prompt 模板，覆盖研发、产品、运营等常见工作场景。每个模板采用统一的 `Role / Task / Requirements / Output Format` 结构，可变部分用 `{variable}` 占位，可直接替换后使用。

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

## 模板结构说明

所有模板统一包含四个字段：

- **Role（角色）**：定义 AI 扮演的专业角色与能力边界
- **Task（任务）**：写清要完成的任务和输入材料
- **Requirements（要求）**：输出必须遵守的结构、质量和约束
- **Output Format（输出格式）**：规定可直接落地的输出骨架

## 使用方法

1. **复制模板**：把对应 `.md` 的正文复制到对话或 Prompt 编辑器
2. **替换占位符**：把 `{variable}` 换成实际内容（如 `{code_snippet}`、`{meeting_notes}`）
3. **按需裁剪**：可增删 `Requirements` 与 `Output Format` 的条目，四个字段保持不动
4. **二次定制**：要改语气或深度时，在 `Role` 或 `Requirements` 里追加约束（如「控制在 500 字内」「面向非技术读者」）

## 注意事项

- 模板默认以中文为主，保留必要英文术语；需要英文输出时，在 `Task` 或 `Requirements` 里写明
- 输入真实代码、用户信息或财务数据前先脱敏
- 高频且效果稳定的模板，建议沉淀回本目录

*（内容由AI生成，仅供参考）*

</details>

<details>
<summary><strong>English</strong></summary>

# Prompt templates

Eight reusable prompt templates for engineering, product, and operations work. Each one uses the same `Role / Task / Requirements / Output Format` structure. Replace every `{variable}` before you send it.

## Templates

| Template | Use | For | File |
|----------|-----|-----|------|
| Code Review | Review quality, security, and performance; return a severity-ranked issue list and fixes | Engineers / tech leads | [code-review.md](code-review.md) |
| PRD | Turn a business idea into a PRD with functional requirements, acceptance criteria, and milestones | Product managers | [prd.md](prd.md) |
| Test Cases | Design coverage from a feature description, including a traceability matrix | QA engineers | [test-cases.md](test-cases.md) |
| Competitor Analysis | Compare positioning, features, business model, and strengths; recommend a response | Product / marketing / ops | [competitor-analysis.md](competitor-analysis.md) |
| Data Analysis | Break down metrics, trends, and anomalies into actions | Analysts / ops | [data-analysis.md](data-analysis.md) |
| Meeting Minutes | Turn notes into decisions and tracked action items | Anyone | [meeting-minutes.md](meeting-minutes.md) |
| Term Research | Research a term into a short learning brief: definition, research, industry context, and a study path | Learners / researchers / writers | [term-research.md](term-research.md) |
| Handoff | At the end of a session, record progress, open issues, and the context needed to continue | Anyone / project handoff | [handoff.md](handoff.md) |

## Structure

- **Role**: who the model is and what it is responsible for
- **Task**: the job and the inputs
- **Requirements**: structure, quality bar, and constraints
- **Output Format**: the skeleton of the answer you want to keep

## How to use

1. Copy the body of the `.md` file into your chat or prompt editor.
2. Replace each `{variable}` with real input.
3. Add or remove items under Requirements and Output Format; keep the four fields.
4. Tighten tone or length in Role or Requirements when you need to (for example, "under 500 words" or "for a non-technical reader").

## Notes

- Templates are written in Chinese and keep the English terms they need. Ask for English output in Task or Requirements.
- Remove secrets, personal data, and live financials before you paste.
- When a variant works often, add it back to this folder.

*(AI-generated content, for reference only.)*

</details>
