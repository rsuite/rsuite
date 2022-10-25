[English][readm-en] | 中文版

<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img src="https://user-images.githubusercontent.com/1203827/65102389-7be3f100-d9fd-11e9-859e-ae9617ed2f91.png" alt="React Suite logo">
  </a>
</p>

[![npm][npm-svg]][npm-home]
[![codecov](https://codecov.io/gh/rsuite/rsuite/branch/main/graph/badge.svg?token=HGeKd0BD3t)](https://codecov.io/gh/rsuite/rsuite)
[![Discord][discord-svg]][discord-invite]
[![Gitter][gitter-svg]][gitter]
[![Gitter][gitter-cn-svg]][gitter-cn]

React Suite 是一套 React 组件库，为后台产品而生。同时也是一个具有贴心设计以及对开发者友好的 UI 框架。

### UI Design

React Suite 设计原型与规范， [点击查看][rsuite-design]。

## 支持的平台

### 浏览器

React Suite 支持最新的，稳定版的全部主流浏览器和平台。 从 React Suite 5 开始不支持 IE10 以下版本(包括 IE10)。不推荐在移动端使用。

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=11 | >=14 | >= 45   | >= 49  | >= 10  |

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

```jsx
import { Button } from 'rsuite';
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'

function App() {
  return <Button appearance="primary">Hello World</Button>;
}
```

您可以在 [CodeSandbox][live-preview-on-codesandbox] 上查看该示例。

### 文档

您可以阅读[完整文档][rsuite-doc-guide]，或者从下面几个章节开始学习

- [如何使用？][rsuite-doc-guide]
- [自定义主题][rsuite-doc-guide-themes]
- [国际化][rsuite-doc-guide-intl]
- [Right-to-left][rsuite-doc-guide-intl]
- [组件][rsuite-components-overview]

<details>
<summary>更多的示例</summary>

- [管理系统][demo-admin]
- [模块化按需加载][demo-modular-import]
- [CDN 引入][demo-cdn]
- [国际化方案][demo-intl-app]
- [多主题方案][demo-multiple-themes]
- [RTL 方案 - rtlcss][demo-rtlcss]
- [RTL 方案 - postcss-rtl][demo-postcss-rtl]
- [在 create-react-app 中使用][demo-create-react-app]
- [在 Electron 中使用][demo-electron]
- [在 Flow 中使用][demo-flow-app]
- [在 TypeScript 中使用][demo-typescript-app]
- [在 Next.js 中使用][demo-nextjs]
- [在 Next.js 和 Typescript 中使用 ][demo-nextjs-typescript]
- [在 UmiJS 中使用][demo-umi-app]
- [在 Snowpack 中使用][demo-snowpack]
- [在 Vite 中使用][demo-vite]
</details>

## 历史版本

上个大版本 4.x 将不再添加新特性，
我们推荐你升级到最新的 5.x 版本。
4.x 的功能修复仍会在一段时间内提供支持，
安全修复也会支持，直到 6.x 开始开发。

### 历史版本的文档

- [4.x 版本文档](https://v4.rsuitejs.com/)
- [3.x 版本文档](https://v3.rsuitejs.com/)

## 更新日志

每一个版本的详细变化记录在[Release Notes][release-notes]

## 贡献

在开始之前，确保您已读[贡献指南][contributing]。

## 支持 React Suite

如果您喜欢 React Suite，可以通过以下方式支持我们：

- Star 这个项目。
- 如果您在您的项目中使用了 React Suite，欢迎在这里[留言][issues-11]！
- 在 [OpenCollective](https://opencollective.com/rsuite#) 上赞助我们。

这个项目的存在归功于所有贡献者。

<a href="https://github.com/rsuite/rsuite/graphs/contributors" target="_blank">
  <img src="https://contrib.rocks/image?repo=rsuite/rsuite" />
</a>

[![opencollective-now][opencollective-svg]][opencollective-home]

国内交流群, 添加 React Suite 小助手，备注 rsuite， 邀请入群。

<img src="https://user-images.githubusercontent.com/1203827/51657342-7ace0180-1fdf-11e9-9237-5d19c7a5c7da.jpeg" width="200" />

## License

React Suite 基于 [MIT licensed][license] 发布。

[readm-en]: https://github.com/rsuite/rsuite/blob/master/README.md
[npm-svg]: https://img.shields.io/npm/v/rsuite
[npm-home]: https://www.npmjs.com/package/rsuite
[discord-svg]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]: https://discord.gg/R8mnjwh
[rsuite-design]: https://rsuitejs.com/design/default
[live-preview-on-codesandbox]: https://codesandbox.io/s/rsuite-template-5vq6zo2z5l
[rsuite-doc-guide]: https://rsuitejs.com/guide/introduction
[rsuite-doc-guide-themes]: https://rsuitejs.com/guide/customization
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
[gitter-svg]: https://img.shields.io/gitter/room/rsuite/rsuite?label=chat-english
[gitter-cn]: https://gitter.im/rsuite/rsuite-CN?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter-cn-svg]: https://img.shields.io/gitter/room/rsuite/rsuite?label=chat-chinese
[demo-admin]: https://github.com/rsuite/rsuite-management-system
[demo-modular-import]: https://github.com/rsuite/rsuite/tree/master/examples/with-babel-preset-rsuite
[demo-cdn]: https://github.com/rsuite/rsuite/tree/master/examples/cdn
[demo-create-react-app]: https://github.com/rsuite/rsuite/tree/master/examples/create-react-app
[demo-electron]: https://github.com/rsuite/rsuite/tree/master/examples/with-electron
[demo-intl-app]: https://github.com/rsuite/rsuite/tree/master/examples/custom-i18n
[demo-multiple-themes]: https://github.com/rsuite/rsuite/tree/master/examples/custom-multiple-themes
[demo-flow-app]: https://github.com/rsuite/rsuite/tree/master/examples/with-flow
[demo-typescript-app]: https://github.com/rsuite/rsuite/tree/master/examples/with-typescript
[demo-nextjs]: https://github.com/rsuite/rsuite/tree/master/examples/with-nextjs
[demo-umi-app]: https://github.com/rsuite/rsuite/tree/master/examples/with-umi
[demo-rtlcss]: https://github.com/rsuite/rsuite/tree/master/examples/with-rtlcss
[demo-postcss-rtl]: https://github.com/rsuite/rsuite/tree/master/examples/with-postcss-rtl
[demo-nextjs-typescript]: https://github.com/rsuite/rsuite/tree/master/examples/with-nextjs-typescript
[demo-snowpack]: https://github.com/rsuite/rsuite/tree/master/examples/with-snowpack
[demo-vite]: https://github.com/rsuite/rsuite/tree/master/examples/with-vite
