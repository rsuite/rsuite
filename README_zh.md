[English][readm-en] | 中文版

<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img src="https://user-images.githubusercontent.com/1203827/65102389-7be3f100-d9fd-11e9-859e-ae9617ed2f91.png" alt="React Suite logo">
  </a>
</p>

[![npm][npm-svg]][npm-home] [![Travis][travis-svg]][travis-home] [![Coverage Status][coverage-svg]][travis-home] [![Discord][discord-svg]][discord-invite] [![Gitter][gitter-svg]][gitter]

React Suite 是一套 React 组件库，为后台产品而生。同时也是一个具有贴心设计以及对开发者友好的 UI 框架。

### UI Design

React Suite 设计原型与规范， [点击查看][rsuite-design]。

## 支持的平台

### 浏览器

React Suite 支持最新的，稳定版的全部主流浏览器和平台。 从 React Suite 3 开始不支持 IE9 以下版本(包括 IE9)。不推荐在移动端使用。

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=10 | >=14 | >= 45   | >= 49  | >= 10  |

### 服务端

React Suite 支持服务端渲染， 支持通过 [Next.js](https://github.com/zeit/next.js) 构建应用。

## 支持的开发环境

- 支持 React 16 +
- 支持 [TypeScript](http://www.typescriptlang.org/)
- 支持 [Electron](https://electronjs.org/)

## 安装

React Suite 可通过 [npm][npm-home] 安装。

```bash
npm i rsuite --save
```

## 使用

这里有一个简单的示例：

```js
import { Button } from 'rsuite';
import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'

ReactDOM.render(<Button>Button</Button>, mountNode);
```

您可以在 [CodeSandbox][live-preview-on-codesandbox] 上查看该示例。

### 文档

您可以阅读[完整文档][rsuite-doc-guide]，或者从下面几个章节开始学习

- [如何使用？][rsuite-doc-guide]
- [自定义主题][rsuite-doc-guide-themes]
- [国际化][rsuite-doc-guide-intl]
- [Right-to-left][rsuite-doc-guide-intl]
- [组件][rsuite-components-overview]

**历史版本:**

- [3.\* 版本](https://v3.rsuitejs.com/)
- [2.\* 版本](https://v2.rsuitejs.com/)

### 示例

- [管理系统][demo-admin]
- [模块化按需加载][demo-modular-import]
- [CDN 引入][demo-cdn]
- [国际化方案][demo-intl-app]
- [多主题方案][demo-multiple-themes]
- [在 create-react-app 中使用][demo-create-react-app]
- [在 Flow 中使用][demo-flow-app]
- [在 TypeScript 中使用][demo-typescript-app]
- [在 Next.js 中使用][demo-ssr-app]

## 更新日志

每一个版本的详细变化记录在[Release Notes][release-notes]

## 开发

您可以通过 [Projects](https://github.com/rsuite/rsuite/projects) 查看我们的开发计划，同时希望您能参与其中。

1. Fork `https://github.com/rsuite/rsuite` 这个仓库。

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
$ cd rsuite
$ npm install
$ npm run dev
```

2. Fork `https://github.com/rsuite/rsuite.github.io` 这个仓库。

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.github.io.git
$ cd rsuite.github.io
$ npm install
$ npm run dev
```

3. 您可以开始访问了， 在浏览器输入 http://127.0.0.1:3200/

> `rsuite.github.io` 会依赖 `rsuite` 中的组件，并支持热更新。

Gitee 用户访问地址: https://gitee.com/rsuite/rsuite

## 贡献

在开始之前，确保您已读[贡献指南][contributing]。

编辑器的配置参考 [.prettierrc][prettierrc]， 下载编辑的插件 https://prettier.io/

## 支持 React Suite

如果您喜欢 React Suite，可以通过以下方式支持我们：

- Star 这个项目。
- 如果您在您的项目中使用了 React Suite，欢迎在这里[留言][issues-11]！
- 在 [OpenCollective](https://opencollective.com/rsuite#) 上赞助我们。

这个项目的存在归功于所有贡献者。

<a href="https://github.com/rsuite/rsuite/graphs/contributors" target="_blank">
  <img src="https://opencollective.com/rsuite/contributors.svg?width=890" />
</a>

国内交流群, 添加 React Suite 小助手，备注 rsuite， 邀请入群。

<img src="https://user-images.githubusercontent.com/1203827/51657342-7ace0180-1fdf-11e9-9237-5d19c7a5c7da.jpeg" width="200" />

## License

React Suite 基于 [MIT licensed][license] 发布。

[readm-en]: https://github.com/rsuite/rsuite/blob/master/README.md
[npm-svg]: https://badge.fury.io/js/rsuite.svg
[npm-home]: https://www.npmjs.com/package/rsuite
[travis-svg]: https://travis-ci.org/rsuite/rsuite.svg?branch=master
[travis-home]: https://travis-ci.org/rsuite/rsuite
[coverage-svg]: https://coveralls.io/repos/github/rsuite/rsuite/badge.svg?branch=master
[travis-home]: https://coveralls.io/github/rsuite/rsuite?branch=master
[discord-svg]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]: https://discord.gg/R8mnjwh
[rsuite-design]: https://rsuitejs.com/design/default/index.html
[live-preview-on-codesandbox]: https://codesandbox.io/s/mo7jxvr9x9?from-embed
[rsuite-doc-guide]: https://rsuitejs.com/guide/introduction
[rsuite-doc-guide-themes]: https://rsuitejs.com/guide/themes
[rsuite-doc-guide-intl]: https://rsuitejs.com/guide/intl
[rsuite-doc-guide-intl]: https://rsuitejs.com/en/guide/intl
[rsuite-components-overview]: https://rsuitejs.com/components/overview
[release-notes]: https://github.com/rsuite/rsuite/releases
[contributing]: https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.zh-CN.md
[prettierrc]: https://github.com/rsuite/rsuite/wiki/.prettierrc
[issues-11]: https://github.com/rsuite/rsuite/issues/11
[opencollective-svg]: https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36
[opencollective-home]: https://opencollective.com/rsuite
[license]: https://github.com/rsuite/rsuite/blob/master/LICENSE
[gitter]: https://gitter.im/rsuite/rsuite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter-svg]: https://badges.gitter.im/rsuite/rsuite.svg
[demo-admin]: https://github.com/rsuite/rsuite-management-system
[demo-modular-import]: https://github.com/rsuite/examples/tree/master/modular-import
[demo-cdn]: https://github.com/rsuite/examples/tree/master/cdn
[demo-create-react-app]: https://github.com/rsuite/examples/tree/master/create-react-app
[demo-intl-app]: https://github.com/rsuite/examples/tree/master/intl-app
[demo-multiple-themes]: https://github.com/rsuite/examples/tree/master/multiple-themes
[demo-flow-app]: https://github.com/rsuite/examples/tree/master/flow-app
[demo-typescript-app]: https://github.com/rsuite/examples/tree/master/typescript-app
[demo-ssr-app]: https://github.com/rsuite/rsuite-management-system-ssr
