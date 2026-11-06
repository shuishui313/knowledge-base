# AI 算法

从易到难，讲常用、面试里常问的机器学习算法。每篇约 5–8 分钟：适用/不适用场景 → 场景 → 概念 → 香港落地例子 → 小练习 → 两道自测。自测后面有收起的参考答案，先做再打开。延伸观看可选：同一系列同一天最多 2 条 YouTube，只收相对热门的解说、一节短课，或有见解的分享；普通的长课、泛泛的网课不收；没有合格的就省略这一节；不写播放量。

**中文** | [English](README.en.md)

[课程](#lessons) · [顺序](#order) · [约定](#conventions)

正文是简体中文。例子用虚拟、公开可见的场景，不写任何机构的内部材料。

<a id="lessons"></a>

## 课程索引

| 编号 | 分类 | 难度 | 面试频率 | 适用场景 | 标题 |
|------|------|------|----------|----------|------|
| ALG-01 | 回归 | 入门 | 极高 | 预测连续数值（保费、销量、处理天数）；需要可解释系数；作为更复杂模型的基线 | [线性回归（Linear Regression）](ALG-01-线性回归(Linear-Regression).md) |

<a id="order"></a>

## 学习顺序

已经写好的是 ALG-01 线性回归。下面是计划中的顺序。这些篇还没有文件，所以这里不放链接：

- ALG-02 逻辑回归
- ALG-03 决策树
- ALG-04 K 近邻
- ALG-05 K-Means
- 然后：随机森林，梯度提升 / XGBoost，朴素贝叶斯，SVM，PCA，神经网络与反向传播，过拟合与正则化，CNN，Attention / Transformer

ALG-05 之后的编号，等写成笔记时按课序接在已分配编号后面。已分配的编号不复用、不重排。

<a id="conventions"></a>

## 收录约定

- 一篇算法一个 Markdown 文件。文件名从一开始就带编号：`ALG-NN-中文名(English).md`。`NN` 是课序，两位数字。新笔记用下一个编号。已分配的编号不复用、不重排
- 文首写编号、日期、分类、难度、面试频率。同一编号出现在本文件和 `README.en.md` 的 `编号` / `No.` 列。写法：`**ALG-01** · **2026-11-06** · **分类** 回归 · **难度** 入门 · **面试频率** 极高`
- 正文先写适用场景和不适用场景，然后是场景、概念、香港落地例子、小练习、两道自测。自测后用 `<details><summary>参考答案</summary>`
- 相关 YouTube 可选，放在参考答案之后、系列导航之前的 `延伸观看`。同一系列同一天最多 2 条。只收相对热门的解说、一节短课，或有见解的分享。普通的长课、泛泛的网课不收。没有合格的就省略这一节，不凑数。不写播放量
- 新增时放入文件，并在本文件和 `README.en.md` 的表里各加一行。表里要有适用场景列。步骤见 [ai-algorithm-note](../../examples/recipes/ai-algorithm-note/README.md)

<details>
<summary>仓库目录</summary>

| 目录 | 说明 |
|------|------|
| [notes/ai-glossary/](../../notes/ai-glossary/README.md) | AI 名词与技术科普 |
| [notes/ai-algorithms/](README.md) | AI 算法短课（本目录） |
| [notes/hk-fde/](../../notes/hk-fde/README.md) | 香港 FDE 短课 |
| [prompt-templates/](../../prompt-templates/README.md) | Prompt 模板，8 个文件 |
| [examples/recipes/](../../examples/recipes/README.md) | 加短课、笔记、算法、模板的步骤 |
| [skills/knowledge-base/SKILL.md](../../skills/knowledge-base/SKILL.md) | 代理维护手册 |
| [docs/](../../docs/decisions.md) | [已采纳](../../docs/decisions.md) · [明确不做](../../docs/declined.md) |

</details>
