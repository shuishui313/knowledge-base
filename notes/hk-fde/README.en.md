# Hong Kong FDE short lessons

One lesson a day, following the order of a real FDE engagement: the role and market, discovery, integration, LLM applications, deployment, security, delivery, and interviews. Full syllabus: [docs/fde-syllabus.md](../../docs/fde-syllabus.md) (in Chinese).

[中文](README.md) | **English**

[Lessons](#lessons) · [Conventions](#conventions)

Each lesson takes 5–8 minutes and explains one idea properly. Examples are fictional Hong Kong scenarios (insurance claims, property repairs, a supermarket chain). Lesson bodies are in Simplified Chinese.

<a id="lessons"></a>

## Index

| No. | Date | Day | Theme | Level | Title |
|-----|------|-----|-------|-------|-------|
| FDE-01 | 2026-11-02 | 1 | The role | Beginner | [What an FDE is, vs SWE, sales engineer and consultant](FDE-01-2026-11-02-岗位-FDE是什么.md) (in Chinese) |
| FDE-02 | 2026-11-03 | 2 | Delivery | Beginner | [The full lifecycle of an FDE project](FDE-02-2026-11-03-交付流程-FDE项目生命周期.md) (in Chinese) |
| FDE-03 | 2026-11-04 | 3 | HK market | Beginner | [Who hires FDEs in Hong Kong, pay, and levelling](FDE-03-2026-11-04-市场-香港FDE谁在招.md) (in Chinese) |
| FDE-04 | 2026-11-05 | 4 | Discovery | Beginner | [Interviewing clients to find the real pain](FDE-04-2026-11-05-需求发现-问出真正的痛点.md) (in Chinese) |
| FDE-05 | 2026-11-06 | 5 | Discovery | Beginner | [Turning a vague ask into a shippable scope](FDE-05-2026-11-06-需求发现-模糊需求变成scope.md) (in Chinese) |
| FDE-06 | 2026-11-07 | 6 | Discovery | Beginner | [Prioritising and saying no](FDE-06-2026-11-07-需求发现-优先级与取舍.md) (in Chinese) |
| FDE-07 | 2026-11-08 | 7 | Discovery | Beginner | [Writing a one-pager the client signs off](FDE-07-2026-11-08-需求发现-写一页纸方案.md) (in Chinese) |
| FDE-08 | 2026-11-09 | 8 | Discovery | Intermediate | [Demo and workshop: explaining tradeoffs to non-technical people](FDE-08-2026-11-09-需求发现-Demo与workshop.md) (in Chinese) |
| FDE-09 | 2026-11-10 | 9 | Integration | Intro | [REST API design and calls: status codes, pagination, rate limits](FDE-09-2026-11-10-集成-REST-API状态码分页限流.md) (in Chinese) |
| FDE-10 | 2026-11-11 | 10 | Integration | Intro to intermediate | [Webhooks: push vs pull, signature verification, replay](FDE-10-2026-11-11-集成-Webhook推拉签名重放.md) (in Chinese) |
| FDE-11 | 2026-11-12 | 11 | Integration | Intro to intermediate | [Authentication and authorization: API keys, OAuth 2.0, JWT, SSO/SAML](FDE-11-2026-11-12-集成-认证授权APIKey-OAuth-JWT-SSO.md) (in Chinese) |
| FDE-12 | 2026-11-13 | 12 | Integration | Intro to intermediate | [Idempotency, retries and backoff: integrations will fail](FDE-12-2026-11-13-集成-幂等重试退避.md) (in Chinese) |
| FDE-13 | 2026-11-14 | 13 | Integration | Intro to intermediate | [Data formats and transformation: JSON/CSV/XML, schema validation, dirty data](FDE-13-2026-11-14-集成-数据格式与转换.md) (in Chinese) |
| FDE-14 | 2026-11-16 | 14 | Integration | Intro to intermediate | [SQL in practice: JOINs, window functions, answering questions from client data](FDE-14-2026-11-16-集成-SQL实战JOIN窗口函数.md) (in Chinese) |
| FDE-15 | 2026-11-17 | 15 | Integration | Intro to intermediate | [ETL and data pipelines: batch vs stream, incremental sync](FDE-15-2026-11-17-集成-ETL数据管道批流增量同步.md) (in Chinese) |
| FDE-16 | 2026-11-18 | 16 | Integration | Intro to intermediate | [Integrating with CRM, ERP and internal systems — and what to do when there is no API](FDE-16-2026-11-18-集成-企业系统对接CRM-ERP无API.md) (in Chinese) |
| FDE-17 | 2026-11-19 | 17 | LLM applications | Beginner | [LLM basics: tokens, context window, temperature, cost and latency](FDE-17-2026-11-19-LLM应用-LLM基础token上下文窗口温度成本延迟.md) (in Chinese) |
| FDE-18 | 2026-11-20 | 18 | LLM applications | Intro to intermediate | [Prompt engineering: structured output, few-shot, and system prompts](FDE-18-2026-11-20-LLM应用-Prompt工程结构化输出few-shot系统提示.md) (in Chinese) |
| FDE-19 | 2026-11-21 | 19 | LLM applications | Intro to intermediate | [Embeddings and vector search: how they work and how to choose](FDE-19-2026-11-21-LLM应用-Embedding与向量检索原理与选型.md) (in Chinese) |
| FDE-20 | 2026-11-22 | 20 | LLM applications | Intro to intermediate | [The RAG pipeline: chunking, retrieval, reranking, and citations](FDE-20-2026-11-22-LLM应用-RAG全流程切块召回重排引用.md) (in Chinese) |
| FDE-21 | 2026-11-23 | 21 | LLM applications | Intro to intermediate | [Why RAG answers go wrong: common failure modes and debugging](FDE-21-2026-11-23-LLM应用-RAG为什么会答错常见失败模式与排查.md) (in Chinese) |

<a id="conventions"></a>

## Conventions

- One file per lesson: `FDE-NN-YYYY-MM-DD-主题简述.md`, where `NN` matches Day. Serials are never reused.
- Order: scenario, analogy, how it works (the problem, the mechanism, where it breaks), the FDE view, an interview question, a one-line takeaway, and two quiz questions with answers in `<details><summary>参考答案</summary>`.
- Employer types follow who actually hires FDEs in Hong Kong: AI-native product companies, big-tech cloud platforms, consulting and system integrators, and in-house teams. The second quiz question switches employer type.
- No invented interview quotes, company statements, or numbers.
- Add a row here and in `README.md` for each new lesson.
