# Contributing to RSUITE

RSUITE 在提供给开发者服务的同时也希望能得到社区的帮助。本篇文章介绍您如何帮助 RSUITE 做的更好，贡献自己的一份力量。

## Bug 反馈

我们统一通过 Github Issues 收集 bug，及状态管理。如果你发现了一个 bug，可以通过 Github Issues 通知我们。


## 新需求

如果你有一个需求是 RSUITE 还没有的，可以告诉我们，我们会评估需求的合理性，会在合适的版本中实现你的功能。 您也可以参与到我们的开发中，提交 Pull Request。


## Pull Request

我们将认真 review 每一个 Pull Request，如果满足我们代码要求，会合并您的代码。

需要遵循以下过程:

- Fork 项目，克隆你的 fork。

```bash
git clone https://github.com/<your-username>/rsuite.git
# Navigate to the newly cloned directory
cd rsuite
```
- 如果您以前克隆过, 请从上游最新:

```bash
git fetch upstream
```
- 安装项目依赖，在项目根目录执行:
```bash
npm install
```
- 接下来可以开始，添加你的代码，可以是修复一个bug ，也可以是新增一个功能。
- 为了确保功能的稳定，您需要编写测试用例，并且能通过测试，执行以下命令:
```bash
npm run test
```
- 为了确保代码的统一风格，你需要注意代码规范，执行以下命令:
```bash
npm run lint
```
- 打开一个 Pull Request。


最后感谢你的参与。
