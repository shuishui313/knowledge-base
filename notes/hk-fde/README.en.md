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

<a id="conventions"></a>

## Conventions

- One file per lesson: `FDE-NN-YYYY-MM-DD-主题简述.md`, where `NN` matches Day. Serials are never reused.
- Order: scenario, analogy, how it works (the problem, the mechanism, where it breaks), the FDE view, an interview question, a one-line takeaway, and two quiz questions with answers in `<details><summary>参考答案</summary>`.
- Employer types follow who actually hires FDEs in Hong Kong: AI-native product companies, big-tech cloud platforms, consulting and system integrators, and in-house teams. The second quiz question switches employer type.
- No invented interview quotes, company statements, or numbers.
- Add a row here and in `README.md` for each new lesson.
