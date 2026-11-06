---
name: knowledge-base
description: Maintain shuishui313/knowledge-base and its public Knowledge Base site. Use when adding FDE/AI/ALG notes, editing site/ UI, bilingual indexes, or repo conventions. Read docs/decisions.md and docs/declined.md first.
---

# 维护 knowledge-base

本手册给要改这个仓库的代理。正文是简体中文。先读 [docs/decisions.md](../../docs/decisions.md) 和 [docs/declined.md](../../docs/declined.md)，再读 [AGENTS.md](../../AGENTS.md)。三份都是中文。

## 动手前

1. `git fetch origin main`，在最新 main 上看文件。本地快照可能落后。
2. 任务写明直接推 main 时，在 `main` 上提交并 `git push origin main`。没写明就不要擅自推 main。
3. 只改本仓库。不要改 EveryNews、MediaMgDashboard、ruflo。
4. 不编造链接。索引里的每一行都要指向现存文件。`prompt-templates/email-draft.md` 已删除，不要写回去。

## 双语索引

主要索引用成对的 `README.md` 与 `README.en.md`。

- 中文顶栏：`**中文** | [English](README.en.md)`
- 英文顶栏：`[中文](README.md) | **English**`
- 标题下：一行价值说明、语言切换、锚点导航。锚点 id 必须在本页存在
- 英文页链到中文正文时加 `(in Chinese)`
- 不用 details 做语言切换。details 只用于 `参考答案` 和文末目录表
- 加一篇内容时，中英索引一起更新

需要改的索引：仓库根、`notes/hk-fde/`、`notes/ai-glossary/`、`notes/ai-algorithms/`、`prompt-templates/`。

## 四种内容

| 内容 | 放哪 | 步骤 |
|------|------|------|
| FDE 短课 | `notes/hk-fde/` | [examples/recipes/fde-daily-lesson](../../examples/recipes/fde-daily-lesson/README.md) |
| AI 科普笔记 | `notes/ai-glossary/` | [examples/recipes/ai-glossary-note](../../examples/recipes/ai-glossary-note/README.md) |
| AI 算法笔记 | `notes/ai-algorithms/` | [examples/recipes/ai-algorithm-note](../../examples/recipes/ai-algorithm-note/README.md) |
| Prompt 模板 | `prompt-templates/` | [examples/recipes/prompt-template](../../examples/recipes/prompt-template/README.md) |

源文件小标题只写名称（场景、定义、适合什么），不要写「一、」「二、」或「1. 场景」。页面会统一加 01、02、03。已带中文序号的标题不要再叠一层编号。

FDE 短课顺序：场景 → 概念 → 香港落地例子 → 面试怎么说 → 小练习 → 两道自测，然后 `<details><summary>参考答案</summary>`。

AI 算法笔记先写招聘切入，再写适用场景和不适用场景，然后是场景 → 概念 → 香港落地例子 → 面试怎么说 → 小练习 → 两道自测，再收起参考答案。索引表要有适用场景列。

AI 科普笔记保持自己的分节，但同样先写招聘要考的那一层，并加上「面试怎么说」和恰好两道自测。

三类笔记都以香港 FDE 招聘要考的内容为主。答案按公司类型分开：虚拟银行/保险、物流、公营柜面、AI 产品或解决方案公司。一种公司写透，其余用一张对照表。公开面经只标明「公开面经里的常见问法」，不编造具名银行或保险公司的原话、候选人故事或逐字题。可以有短的拓展补充。「面试怎么说」大约一分钟：英文口语句，现场用粤语讲清楚，用英文把确认写下来。自测两题，其中一题换成另一类公司。还没写的算法下一篇只预告题目，不建文件、不放链接。

新模板沿用 `Role / Task / Requirements / Output Format`，对照 `prompt-templates/code-review.md`。

## 编号

每篇 FDE 短课、AI 笔记和 AI 算法笔记都有稳定编号。编号写进文件名，也写在文首，并出现在该系列两份索引的 `编号` / `No.` 列。新的一篇用该系列下一个编号。已分配的编号不复用、不重排。

- FDE：`FDE-NN-YYYY-MM-DD-主题简述.md`。`NN` 与 Day 相同，两位数字。Day 1 是 `FDE-01`。文首写法：`**FDE-05** · **2026-11-06** · Day 5 · **主题板块** 岗位本身 · **难度** 进阶`。
- AI：`AI-NN-中文名(English).md`。`NN` 按索引里已有收录日期从早到晚，两位数字。第一篇是 `AI-01`。文首只写编号，例如 `**AI-01**`。笔记原来没有日期行时，不要为了编号补一行日期。
- ALG：`ALG-NN-中文名(English).md`。`NN` 是课序，两位数字。第一篇是 `ALG-01`。文首写法：`**ALG-01** · **2026-11-06** · **分类** 回归 · **难度** 入门 · **面试频率** 金融场景高；纯公式推导在 FDE 面经里少见`。

## 延伸观看

相关 YouTube 是可选项，放在 `延伸观看`（英文索引里称 Related watching）。

- 同一系列同一天最多 2 条
- 只收相对热门的 YouTube 解说、一节短课，或有见解的分享
- 普通的长课、泛泛的网课不收
- 没有合格的就不要这一节，不凑数
- 不把播放量写进文件

FDE 短课和 AI 算法笔记放在参考答案之后、系列导航之前。AI 笔记放在一句话总结之后。

## 公开阅读站

站点在 `site/`（Astro）。`notes/` 是正文源。构建时生成静态页，推送 `main` 后由 GitHub Actions 发布到 https://shuishui313.github.io/knowledge-base/ （项目站，路径前缀 `/knowledge-base/`）。

- 站点名是 Knowledge Base（「知识库」的英文）。页眉、标题、页脚都用这个名字。
- 不要写「香港」「前线课」，也不要改成 Database。
- 课文只改 `notes/`。不要为了网页改写课文正文。
- 任务写明直接推 main 时，推送后等 Pages 工作流成功，再用 HTTP 核对页面，不要只信构建日志。

### 首页（已定）

深色首屏加浅色「三条路径」三张卡片。这是第一版公开首页，用户 2026-11-06 表示满意。

- 左侧：shuishui313、大标题 Knowledge Base、副标题「岗位 · 科普 · 算法」、按钮「从 FDE-01 开始」和「三条路径」、编号范围
- 右侧：仪器图（`.hero-instrument`）
- 首屏：`min-height: calc(100svh - var(--nav-h))`；垂直居中并略上移（`align-items: center; padding: 64px 0 14vh`）
- 路径卡片：桌面 `min-height: 248px; padding: 32px`；`.track-foot` 用 `margin-top: auto` 贴底，保留顶部分割线。窄屏 `min-height: 0; padding: 24px`
- 不要加「最近更新」，不要加学习进度或进度环

### 首页动效（方案 B，仅首页）

- 仅在用户未开启「减少动态效果」时运行。给 `html` 加 `home-motion`。
- 不要给 `.hero-copy` 或标题做入场位移/淡入动画。曾经用 `home-enter`（`translate` + `opacity`，且在首次绘制之后才加 class）会让 “Knowledge Base” 字母横向闪一下。
- 仪器图随首屏滚出：`--recede` 最多 72px 上移，`--instrument-opacity` 从 1 降到 0.6。放置仍是 `translateY(calc(-52% - var(--recede, 0px)))`。
- `#tracks` 用 IntersectionObserver（大约 22% 进入视野）加 `is-in`。标题和三张卡片淡入上移 32px、约 1.15s；卡片延迟 0.12s、0.26s、0.4s。
- `prefers-reduced-motion: reduce` 时保持静止；仪器图回到 `translateY(-52%)`、透明度 1。课文页不要加这套动效。

### 目录与课文页的小文案

- 不要在芯片、目录卡片或 `.lesson-meta` 里展示发布日期（`YYYY-MM-DD`）。日期仍可写在文件名和文首元信息里，供写作和检索；正文里举例用到的日期不要删。
- 页脚 `shuishui313 · 2026` 这种站点年份可留。
- `Day N` 和阅读时长：2026-11-06 用户说先不动。FDE 目录卡仍可显示 Day，课文标签也可保留 Day。
- 目录卡片 `.lesson-card`：`min-height: 220px`；`.lesson-card .chips { margin: auto 0 0; padding-top: 8px }`，让标签沉底并对齐。去掉日期后不要留下空的 `.lesson-meta` 行。
- 课文开头标签保持一行（窄屏可横向滚动）。有用的标签：入门/进阶、FDE 主题块、科普中英术语、算法分类；算法页可保留「面试频率」。
- 课文标题在约 1100px 以上强制单行，不要给标题加过窄的宽度上限。
- 文末反思：有「保存」按钮；保存后提示「已保存」，并出现「查看笔记」链到 `/notes/`。笔记只存在浏览器 `localStorage` 键 `qxk:v1:notes`，不要加登录。
- 较长的科普/算法课文加目录。相关课文：FDE 正文提到幻觉、RAG/检索增强或工具调用时再链到对应科普；不要给没提到这些词的 FDE 页硬加相关课文块。

## 诚实

本仓库没有靠运行结果才能成立的脚本。没有跑过的检查，不要写成测试通过。

## English

Read `docs/decisions.md` and `docs/declined.md` first; both are in Chinese. Keep bilingual indexes as two files with the top-bar switcher above, including `notes/ai-algorithms/`. FDE lessons go scene, concept, Hong Kong example, 「面试怎么说」, drill, then two quiz questions, with answers inside `<details><summary>参考答案</summary>`. Algorithm notes open with a hiring section, then applicable and not-applicable scenarios, then the same lesson shape, and the index keeps an applicable-scenarios column. Glossary notes keep their own headings and still lead with hiring, plus 「面试怎么说」 and exactly two quiz questions. All three lead with Hong Kong FDE hiring. Answers differ by company type (virtual bank or insurer, logistics, public counter, AI product or solutions company): one type in depth, the others in one comparison table. Label public interview patterns 「公开面经里的常见问法」; do not invent a quote, candidate story, or verbatim question from a named bank or insurer. 「面试怎么说」 is about one minute of English a candidate can say, plus Cantonese on site and English for the written confirmation. One quiz question switches company type. Do not create or link an algorithm lesson that has no file yet. Filenames include the serial from the start: `FDE-NN-YYYY-MM-DD-主题简述.md` (NN matches Day), `AI-NN-中文名(English).md` (NN follows the index date), `ALG-NN-中文名(English).md` (NN is the lesson order). Never reuse or renumber an assigned serial. Optional YouTube links go in `延伸观看` (Related watching): at most 2 per series per day, only a relatively popular explainer, one short lesson, or an insightful take; skip ordinary long or generic courses; omit the section if none qualify; do not write view counts. Update both indexes when you add a file. Do not invent links. Do not edit EveryNews, MediaMgDashboard, or ruflo from this repo. Push `main` only when the task says to, after fetching `origin main`.

The public site is named Knowledge Base. Do not add a 「最近更新」 module or progress UI, and do not animate the hero title on entrance. Do not show publish dates in UI chrome. Homepage motion is scheme B only: the instrument recedes on scroll, and the three track cards reveal when that section enters; catalog chips are pinned to the card bottom. Desktop track cards are 248px minimum and lesson cards are 220px. Source headings stay unnumbered words such as 场景 or 定义; do not write 一、二、三, because the site adds 01, 02, 03.
