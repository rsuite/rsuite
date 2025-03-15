[English][readm-en] | 中文版

<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img src="https://user-images.githubusercontent.com/1203827/65102389-7be3f100-d9fd-11e9-859e-ae9617ed2f91.png" alt="React Suite logo">
  </a>
</p>

[![npm][npm-svg]][npm-home]
[![GitHub Actions][actions-svg]][actions-home]
[![npm bundle size][npm-bundle-size-img]][npm-bundle-size]
[![codecov][codecov-img]][codecov]
[![Discord][discord-svg]][discord-invite]
[![Gitter][gitter-svg]][gitter]
[![Gitter][gitter-cn-svg]][gitter-cn]
[![Gitpod ready-to-code][gitpod-img]][gitpod]

React Suite 是一套 React 组件库。致力于提供高质量并且全面的 React 组件，以帮助开发者快速构建 Web 应用。

## 支持的平台

### 浏览器

| ![][edge]<br/>Edge | ![][firefox]<br/>Firefox | ![][chrome]<br/>Chrome | ![][safari]<br/>Safari | ![][electron]<br/>Electron |
| ------------------ | ------------------------ | ---------------------- | ---------------------- | -------------------------- |
| Edge               | last 2 versions          | last 2 versions        | last 2 versions        | last 2 versions            |

[edge]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png
[firefox]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[chrome]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[safari]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png
[electron]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png

### 服务端

React Suite 支持服务端渲染， 支持通过 [Next.js](https://github.com/zeit/next.js) 构建应用。

## 安装

```bash
# with npm
npm install rsuite

# with Yarn
yarn add rsuite

# with pnpm
pnpm add rsuite

# with Bun
bun add rsuite
```

## 使用

```jsx
import { Button } from 'rsuite';
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'

function App() {
  return <Button appearance="primary">Hello World</Button>;
}
```

更多关于如何开始的指南，请查看[这里](https://rsuitejs.com/guide/usage/)。

## 文档

https://rsuitejs.com 是 React Suite 的最新版本的网站。有关旧版本，请访问这里。

- [4.x 版本文档](https://v4.rsuitejs.com/)
- [3.x 版本文档](https://v3.rsuitejs.com/)

v4 将不再添加新特性，我们推荐你升级到最新的 v5 版本。v4 的功能修复仍会在一段时间内提供支持，安全修复也会支持，直到 v6 开始开发。

## 框架使用指南

React Suite 可以在您喜欢的框架中使用。我们为这些框架准备了逐步指南：

- [Next.js (App)](https://rsuitejs.com/guide/use-next-app/)
- [Next.js (Page)](https://rsuitejs.com/guide/use-next-pages)
- [Create React App](https://rsuitejs.com/guide/use-with-create-react-app/)
- [Vite](https://rsuitejs.com/guide/use-vite/)

## 更新日志

每一个版本的详细变化记录在[Release Notes][release-notes]

## 贡献

在开始之前，确保您已读[贡献指南][contributing]。

## 赞助服务

这些优秀的服务帮助我们构建和维护项目。

| Service                                         | Description                                   |
| ----------------------------------------------- | --------------------------------------------- |
| [![GitHub][github-logo]][github]                | Github 让我们可以托管 Git 仓库并协调贡献。    |
| [![Vercel][vercel-logo]][vercel]                | Vercel 让我们可以部署应用。                   |
| [![CodeCov][codecov-logo]][codecov]             | CodeCov 让我们可以检查代码覆盖率。            |
| [![Gitee][gitee-logo]][gitee]                   | Gitee 授予我们 GVP - Gitee 最有价值开源项目。 |
| [![CodeSandbox][codesandbox-logo]][codesandbox] | CodeSandbox 让我们可以提供组件的实时预览。    |
| [![Stackblitz][stackblitz-logo]][stackblitz]    | Stackblitz 让我们可以提供组件的实时预览。     |

[github]: https://github.com/
[github-logo]: https://avatars.githubusercontent.com/u/9919?s=32&v=4
[vercel]: https://vercel.com/
[vercel-logo]: https://avatars.githubusercontent.com/u/14985020?s=32&v=4
[codecov]: https://about.codecov.io/
[codecov-logo]: https://avatars.githubusercontent.com/u/8226205?s=32&v=4
[gitee]: https://gitee.com/
[gitee-logo]: https://gitee.com/static/images/logo-en.svg
[codesandbox]: https://codesandbox.io/
[codesandbox-logo]: https://avatars.githubusercontent.com/u/32880324?s=32&v=4
[stackblitz]: https://stackblitz.com/
[stackblitz-logo]: https://avatars.githubusercontent.com/u/28635252?s=32&v=4

## 支持 React Suite

如果您喜欢 React Suite，可以通过以下方式支持我们：

- Star 这个项目。
- 如果您在您的项目中使用了 React Suite，欢迎在这里[留言][issues-11]！
- 在 [OpenCollective](https://opencollective.com/rsuite#) 上赞助我们。

这个项目的存在归功于所有贡献者。

<a href="https://github.com/rsuite/rsuite/graphs/contributors" target="_blank">
  <img src="https://contrib.rocks/image?repo=rsuite/rsuite&max=600" />
</a>

[![opencollective-now][opencollective-svg]][opencollective-home]

微信交流群, 添加 React Suite 小助手，备注 rsuite， 邀请入群。

<img src="https://user-images.githubusercontent.com/1203827/51657342-7ace0180-1fdf-11e9-9237-5d19c7a5c7da.jpeg" width="200" />

## License

React Suite 基于 [MIT licensed][license] 发布。

[readm-en]: https://github.com/rsuite/rsuite/blob/main/README.md
[npm-svg]: https://img.shields.io/npm/v/rsuite
[npm-home]: https://www.npmjs.com/package/rsuite
[npm-bundle-size-img]: https://badgen.net/bundlephobia/minzip/rsuite?icon=npm
[npm-bundle-size]: https://bundlephobia.com/package/rsuite
[actions-svg]: https://github.com/rsuite/rsuite/workflows/Node.js%20CI/badge.svg?branch=main
[actions-home]: https://github.com/rsuite/rsuite/actions?query=branch%3Amain+workflow%3A%22Node.js+CI%22
[discord-svg]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]: https://discord.gg/R8mnjwh
[release-notes]: https://github.com/rsuite/rsuite/releases
[contributing]: https://github.com/rsuite/rsuite/blob/main/CONTRIBUTING.md
[issues-11]: https://github.com/rsuite/rsuite/issues/11
[opencollective-svg]: https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36
[opencollective-home]: https://opencollective.com/rsuite
[license]: https://github.com/rsuite/rsuite/blob/main/LICENSE
[gitter]: https://gitter.im/rsuite/rsuite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter-svg]: https://img.shields.io/gitter/room/rsuite/rsuite?label=chat-english
[gitter-cn]: https://gitter.im/rsuite/rsuite-CN?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter-cn-svg]: https://img.shields.io/gitter/room/rsuite/rsuite?label=chat-chinese
[codecov]: https://codecov.io/gh/rsuite/rsuite
[codecov-img]: https://codecov.io/gh/rsuite/rsuite/branch/main/graph/badge.svg?token=HGeKd0BD3t
[gitpod]: https://gitpod.io/#https://github.com/rsuite/rsuite
[gitpod-img]: https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod
