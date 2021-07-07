# 关于 React Suite

React Suite 是一套 React 组件库，为中后台产品而生。致力于创造出贴心的交互设计，同时为开发者提供了友好的开发体验。

[![npm][npm-svg]][npm-home] [![Travis][travis-svg]][travis-home] [![Coverage Status][coverage-svg]][travis-home] [![Gitter][gitter-svg]][gitter]

### UI Design

React Suite 设计原型与规范， [点击查看][rsuite-design]。

## 支持的平台

### 浏览器

- React Suite 支持所有主流的现代浏览器。

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /> </br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                  | last 2 versions                                                                                                                                               | last 2 versions                                                                                                                                            | last 2 versions                                                                                                                                           |

- 从 React Suite 3 开始** 不支持 IE9 以下版本(包括 IE9) ** 。
- 我们对 IE10 的支持采取了优雅降级的方式，部分样式和动画的表现会有所简化。

  > 注意：对于 IE 系列浏览器，需要提供使用 Polyfill 进行支持，我们建议您使用 [babel-preset-env][babel-preset-env] 来处理浏览器的兼容性问题。

- 不推荐在移动端使用。

### 服务端

React Suite 支持服务端渲染， 支持通过 [Next.js](https://github.com/zeit/next.js) 构建应用。

## 支持的开发环境

- 支持 React 16 +
- 支持 [TypeScript](http://www.typescriptlang.org/)
- 支持 [Electron](https://electronjs.org/)
- 支持 [Reason](https://github.com/shurygindv/bs-rsuite-ui-react)

## 示例

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
[travis-svg]: https://travis-ci.org/rsuite/rsuite.svg?branch=master
[travis-home]: https://travis-ci.org/rsuite/rsuite
[coverage-svg]: https://coveralls.io/repos/github/rsuite/rsuite/badge.svg?branch=master
[coverage-home]: https://coveralls.io/github/rsuite/rsuite?branch=master
[discord-svg]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]: https://discord.gg/R8mnjwh
[rsuite-design]: https://rsuitejs.com/design/default
[live-preview-on-codesandbox]: https://codesandbox.io/s/mo7jxvr9x9?from-embed
[rsuite-doc-guide]: https://rsuitejs.com/guide/introduction
[rsuite-doc-guide-themes]: https://rsuitejs.com/guide/themes
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
[babel-preset-env]: https://babeljs.io/docs/en/babel-preset-env
[rsuite-stars]: https://img.shields.io/github/stars/rsuite/rsuite?style=social
[demo-nextjs-typescript]: https://github.com/rsuite/rsuite/tree/master/examples/with-next-typescript
[demo-snowpack]: https://github.com/rsuite/rsuite/tree/master/examples/with-snowpack
[demo-vite]: https://github.com/rsuite/rsuite/tree/master/examples/with-vite