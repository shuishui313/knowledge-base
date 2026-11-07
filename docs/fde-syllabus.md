# 香港 FDE 课程表
来源岗位：KBQuest、Fano Labs、ByteDance BytePlus、Retell AI、Deloitte Digital、Nan Fung、NeuroBrain、Schonfeld、OptiMax AI 等香港 FDE JD。
共同要求：客户需求挖掘与范围定义 → 原型 → 生产级交付（Python/TypeScript/Go、REST API/webhook、SQL、云/Docker/K8s）→ LLM 应用（RAG、Agent、评测、guardrails）→ 安全合规 → 上线后采用与交接；强沟通、能面对模糊。
顺序：先建立「FDE 到底做什么」的全景，再按一个真实项目的生命周期往下走。每天一课，按编号推进。

## 模块 A：FDE 是什么（全景）
1. FDE 是什么：和 SWE、Solutions Engineer、售前、咨询的区别（Palantir 起源，为何 AI 公司都在招）
2. 一个 FDE 项目的完整生命周期：discovery → prototype → production → adoption → handover
3. 香港 FDE 市场：谁在招、薪资区间、Junior/Senior 差异、后端背景怎么对上

## 模块 B：Discovery 与范围（客户侧）
4. 需求访谈：怎么问出真正的痛点（workflow mapping、5 Whys）
5. 把模糊需求变成可交付 scope：用户故事、验收标准（acceptance criteria）
6. 优先级与取舍：价值/难度矩阵，什么时候说「不」
7. 写一页纸方案（one-pager / PRD-lite）给客户
8. Demo 与 workshop：怎么给非技术人讲技术取舍

## 模块 C：集成（FDE 的日常硬功夫）
9. REST API 设计与调用：状态码、分页、限流
10. Webhook：推 vs 拉、签名校验、重放
11. 认证授权：API Key、OAuth 2.0、JWT、SSO/SAML 概念
12. 幂等、重试、退避：为什么集成一定会失败
13. 数据格式与转换：JSON/CSV/XML、schema 校验、脏数据处理
14. SQL 实战：JOIN、窗口函数、在客户库里安全地查
15. ETL/数据管道：批 vs 流，增量同步
16. 企业系统对接：CRM、ERP、内部系统，以及「没有 API 怎么办」

## 模块 D：LLM 应用（AI FDE 的核心）
17. LLM 基础：token、上下文窗口、温度、成本与延迟
18. Prompt 工程：结构化输出、few-shot、system prompt
19. Embedding 与向量检索：原理与选型
20. RAG 全流程：切块、召回、重排、引用（grounding）
21. RAG 为什么会答错：常见失败模式与排查
22. Tool calling / Function calling
23. Agent：规划、循环、记忆，什么时候不该用 Agent
24. MCP 与工具生态
25. 评测（Evals）：离线测试集、LLM-as-judge、上线前怎么证明它够好
26. Guardrails 与 human-in-the-loop：防幻觉、防越权操作
27. 可观测性：trace、日志、token 成本监控
28. 语音/对话式 AI 与粤语场景（Fano Labs 类岗位）

## 模块 E：部署与生产化
29. Docker：镜像、容器、为什么交付离不开它
30. Kubernetes 入门：Pod、Deployment、Service，用 FDE 视角看
31. Linux 排障常用命令
32. CI/CD 与测试：让客户环境里的发布可控
33. 云平台基础（AWS 为主）：IAM、VPC、S3、Lambda、托管 LLM（Bedrock 等）
34. 在客户环境部署：私有化、内网、VPC 部署的取舍
35. 生产问题排查：延迟、成本、可靠性三角

## 模块 F：安全与合规
36. Secrets 管理与最小权限
37. 数据隐私：香港 PDPO、金融客户（HKMA/SFC）对数据与 AI 的要求概念
38. 企业 AI 落地的安全审查：客户 IT/安全团队会问什么

## 模块 G：交付与成长
39. 项目管理：进度、风险、变更请求（scope creep）
40. UAT、缺陷分级与上线
41. 用户采用（adoption）与培训、文档、交接
42. 把客户反馈变成产品需求（FDE ↔ 产品团队）
43. 行业场景：银行/保险/零售/地产在香港怎么用 AI

## 模块 H：求职实战
44. FDE 面试长什么样：case interview、系统设计、编码、行为面
45. FDE 系统设计题演练：为一家香港银行设计客服 RAG 系统
46. 用 STAR 讲自己的项目：从后端架构到 FDE
47. 一个可以放进作品集的 FDE 小项目
48. 总复习与查漏
