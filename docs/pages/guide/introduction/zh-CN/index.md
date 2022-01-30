# 关于 React Suite

React Suite 是一套 React 组件库，为中后台产品而生。致力于创造出贴心的交互设计，同时为开发者提供了友好的开发体验。

[![npm][npm-svg]][npm-home] [![Gitter][gitter-svg]][gitter]

### UI Design

React Suite 设计原型与规范， [点击查看][rsuite-design]。

## 支持的平台

### 浏览器

- React Suite 支持所有主流的现代浏览器。

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /> </br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                  | last 2 versions                                                                                                                                               | last 2 versions                                                                                                                                            | last 2 versions                                                                                                                                           |

- 从 React Suite 5 开始** 不支持 IE10 以下版本(包括 IE10) ** 。
- 如果您需要继续在 IE 10 浏览器上使用，请使用 [React Suite 4 版本](https://v4.rsuitejs.com/zh/guide/introduction/)。
- 不推荐在移动端使用。

### 服务端

React Suite 支持服务端渲染， 支持通过 [Next.js](https://github.com/zeit/next.js) 构建应用。

## 支持的开发环境

- 支持 React 16 +
- 支持 [TypeScript](http://www.typescriptlang.org/)
- 支持 [Electron](https://electronjs.org/)
- 支持 [Reason](https://github.com/shurygindv/bs-rsuite-ui-react)

## 示例

<!--{include:(resources/examples/zh-CN/official-examples.md)}-->

## 更新日志

每一个版本的详细变化记录在[Release Notes][release-notes]

## 贡献

在开始之前，确保您已读[贡献指南][contributing]。

编辑器的配置参考 [.prettierrc][prettierrc]， 下载编辑的插件 https://prettier.io/。

## 开发

您可以通过 [Projects](https://github.com/rsuite/rsuite/projects) 查看我们的开发计划，同时希望您能参与其中。

### 测试驱动开发（TDD）

1. Fork `https://github.com/rsuite/rsuite` 这个仓库。

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
$ cd rsuite
```

2. 安装并运行

```bash
$ npm install
$ npm run tdd
```

3. 运行单个组件

```bash
$ M=Button npm run tdd
```

### UI 驱动开发

1. Fork `https://github.com/rsuite/rsuite` 这个仓库。

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
```

2. 安装并运行

```bash
$ cd rsuite
$ npm install
$ cd rsuite/docs
$ npm install
$ npm run dev
```

3. 您可以开始访问了， 在浏览器输入 http://127.0.0.1:3000/

## 支持 RSUITE

如果您喜欢 RSUITE，可以通过以下方式支持我们

- Star 这个项目 [![rsuite-stars][rsuite-stars]](https://github.com/rsuite/rsuite)
- 如果您在您的项目中使用了 RSUITE，欢迎在这里[留言][issues-11]！
- 在 [OpenCollective](https://opencollective.com/rsuite#) 上赞助我们

[![opencollective-now][opencollective-svg]][opencollective-home]

## License

RSUITE 基于 [MIT licensed][license] 发布。

[readm-cn]: https://github.com/rsuite/rsuite/blob/master/README_zh.md
[npm-svg]: https://badge.fury.io/js/rsuite.svg
[npm-home]: https://www.npmjs.com/package/rsuite
[discord-svg]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]: https://discord.gg/R8mnjwh
[rsuite-design]: https://rsuitejs.com/design/default
[live-preview-on-codesandbox]: https://codesandbox.io/s/mo7jxvr9x9?from-embed
[rsuite-doc-guide]: https://rsuitejs.com/guide/introduction
[rsuite-doc-guide-themes]: https://rsuitejs.com/guide/customization
[rsuite-doc-guide-intl]: https://rsuitejs.com/guide/intl
[rsuite-components-overview]: https://rsuitejs.com/components/overview
[release-notes]: https://github.com/rsuite/rsuite/releases
[contributing]: https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.md
[prettierrc]: https://github.com/rsuite/rsuite/wiki/.prettierrc
[issues-11]: https://github.com/rsuite/rsuite/issues/11
[opencollective-svg]: https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36
[opencollective-home]: https://opencollective.com/rsuite
[license]: https://github.com/rsuite/rsuite/blob/master/LICENSE
[gitter]: https://gitter.im/rsuite/rsuite-CN?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter-svg]: https://badges.gitter.im/rsuite/rsuite.svg
[babel-preset-env]: https://babeljs.io/docs/en/babel-preset-env
[rsuite-stars]: https://img.shields.io/github/stars/rsuite/rsuite?style=social
