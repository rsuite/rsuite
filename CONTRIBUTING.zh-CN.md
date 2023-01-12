# 参与贡献到 RSUITE

RSUITE 在提供给开发者服务的同时也希望能得到社区的帮助。本篇文章介绍您如何帮助 RSUITE 做的更好，贡献自己的一份力量。

## 开发

Fork 此仓库到你的命名空间并克隆至本地机器。

    $ git clone git@github.com:<YOUR NAME>/rsuite.git
    $ cd rsuite

在根目录和 `docs/` 目录中安装依赖。

    $ npm i && npm i --prefix docs

现在你可以在 `docs/` 目录中运行 `npm run dev` 来启动开发服务器。
它默认运行在 http://127.0.0.1:3000/ 。

    $ npm run dev --prefix docs

### 测试

多数时候，你都应当确保你的变更没有破坏测试。
在根目录中执行 `npm run tdd` 来运行单元测试脚本。

    $ npm run tdd

你也可以通过设置环境变量 `M` 来仅运行一个指定组件下的单元测试。

    # only run tests in src/Button directory
    $ M=Button npm run tdd

或者多个指定组件下的单元测试。`M` 支持任意 glob 模式。

    # run tests in src/Button and src/ButtonGroup directories
    $ M={Button,ButtonGroup} npm run tdd

当编写测试用例时，我们统一使用 [BDD 断言风格](https://www.chaijs.com/api/bdd/)。

```ts
expect(instance).to.have.class('class-in');
```

## Bug 反馈

我们统一通过 Github Issues 收集 bug，及状态管理。如果你发现了一个 bug，可以通过 Github Issues 通知我们。

## 新需求

如果你有一个需求是 RSUITE 还没有的，可以告诉我们，我们会评估需求的合理性，会在合适的版本中实现你的功能。 您也可以参与到我们的开发中，提交 Pull Request。

## Pull Request

我们将认真 review 每一个 Pull Request，如果满足我们代码要求，会合并您的代码。

需要遵循以下过程:

- Fork 项目，克隆你的 fork。

```bash
git clone https://github.com/<your-username>/rsuite.git
# Navigate to the newly cloned directory
cd rsuite
```

- 如果您以前克隆过, 请从上游更新:

```bash
git fetch upstream
```

- 安装项目依赖，在项目根目录执行:

```bash
npm install
```

- 接下来可以开始添加你的代码，可以是修复一个 bug ，也可以是新增一个功能。
- 为了确保功能的稳定，您需要编写测试用例，并且能通过测试，执行以下命令:

```bash
npm run test
```

- 为了确保代码的统一风格，你需要注意代码规范，执行以下命令:

```bash
npm run lint
```

- 打开一个 Pull Request。

最后感谢你的参与。
