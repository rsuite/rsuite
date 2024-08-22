<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img src="https://user-images.githubusercontent.com/1203827/65102389-7be3f100-d9fd-11e9-859e-ae9617ed2f91.png" alt="React Suite logo">
  </a>
</p>

English | [中文版][readm-cn]

[![npm][npm-svg]][npm-home]
[![GitHub Actions][actions-svg]][actions-home]
[![npm bundle size][npm-bundle-size-img]][npm-bundle-size]
[![codecov][codecov-img]][codecov]
[![Discord][discord-svg]][discord-invite]
[![Gitter][gitter-svg]][gitter]
[![Gitter][gitter-cn-svg]][gitter-cn]
[![Gitpod ready-to-code][gitpod-img]][gitpod]

React Suite is a set of React components. It is committed to providing high-quality and comprehensive React components to help developers quickly build web applications.

## Supported Platforms

### Browser

React Suite supports the latest, stable releases of all major browsers and platforms. IE<=10 is no longer supported since React Suite 5.0. React Suite is designed and implemented for use on modern desktop browsers rather than mobile browsers.

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=11 | >=14 | >= 45   | >= 49  | >= 10  |

### Server

React Suite supports server side rendering. Support [Next.js](https://github.com/vercel/next.js) to build applications.

## Installation

React Suite is available as an [npm package][npm-home].

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

## Usage

```jsx
import { Button } from 'rsuite';
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'

function App() {
  return <Button appearance="primary">Hello World</Button>;
}
```

More guides on how to get started are available [here](https://rsuitejs.com/guide/usage/).

## Documentation

It's the https://rsuitejs.com website for the latest version of React Suite. For older versions head over here:

- [4.x documentation](https://v4.rsuitejs.com/)
- [3.x documentation](https://v3.rsuitejs.com/)

The previous major version 4.x will no longer receive new features,
and it is recommended to upgrade to the latest 5.x releases.
Bug fixes for 4.x are still being supported for a period of time,
and security fixes are supported until 6.x is in progress.

## Framework Guides

React Suite can be used in your favorite framework. We have prepared step-by-step guides for these frameworks:

- [Next.js (App)](https://rsuitejs.com/guide/use-next-app/)
- [Next.js (Page)](https://rsuitejs.com/guide/use-next-pages)
- [Create React App](https://rsuitejs.com/guide/use-with-create-react-app/)
- [Vite](https://rsuitejs.com/guide/use-vite/)

## Changelog

Detailed changes for each release are documented in the [release notes][release-notes].

## Contribution

Make sure you've read the [guidelines][contributing] before you start contributing.

## Sponsoring services

These great services help us to build and maintain the project.

| Service                                         | Description                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------ |
| [![GitHub][github-logo]][github]                | **Github** lets us host the Git repository and coordinate contributions. |
| [![Vercel][vercel-logo]][vercel]                | **Vercel** provides the hosting for the documentation site.              |
| [![CodeCov][codecov-logo]][codecov]             | **CodeCov** lets us monitor test coverage.                               |
| [![Gitee][gitee-logo]][gitee]                   | **Gitee** grants us GVP - Gitee Most Valuable Open Source Project.       |
| [![CodeSandbox][codesandbox-logo]][codesandbox] | **CodeSandbox** lets us provide live previews of the components.         |
| [![Stackblitz][stackblitz-logo]][stackblitz]    | **Stackblitz** lets us provide live previews of the components.          |

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

## Supporting React Suite

If you like React Suite, you can show your support by:

- Starring this repo
- [Leaving a comment here][issues-11] if you are using React Suite in your project (like we do :smile:)
- [Becoming a backer][opencollective-home] on OpenCollective

This project exists thanks to all the people who contribute.

<a href="https://github.com/rsuite/rsuite/graphs/contributors" target="_blank">
  <img src="https://contrib.rocks/image?repo=rsuite/rsuite&max=600" />
</a>

[![opencollective-now][opencollective-svg]][opencollective-home]

## License

React Suite is [MIT licensed][license].

[readm-cn]: https://github.com/rsuite/rsuite/blob/main/README_zh.md
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
