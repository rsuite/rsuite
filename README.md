
<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img src="https://user-images.githubusercontent.com/1203827/65102389-7be3f100-d9fd-11e9-859e-ae9617ed2f91.png" alt="React Suite logo">
  </a>
</p>

English | [中文版][readm-cn]

[![npm][npm-svg]][npm-home]
[![GitHub Actions][actions-svg]][actions-home]
[![codecov](https://codecov.io/gh/rsuite/rsuite/branch/next/graph/badge.svg?token=HGeKd0BD3t)](https://codecov.io/gh/rsuite/rsuite)
[![Discord][discord-svg]][discord-invite]
[![Gitter][gitter-svg]][gitter]
[![Gitter][gitter-cn-svg]][gitter-cn]
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rsuite/rsuite)

React Suite is a set of react component libraries for enterprise system products. It is a well-thought-out and developer-friendly UI framework.

### UI Design

React Suite Design Prototype and specification, click to [view][rsuite-design].

## Supported Platforms

### Browser

React Suite supports the latest, stable releases of all major browsers and platforms. IE<=9 is no longer supported since React Suite 3.0. React Suite is designed and implemented for use on modern desktop browsers rather than mobile browsers.

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=11 | >=14 | >= 45   | >= 49  | >= 10  |

### Server

React Suite supports server side rendering. Support [Next.js](https://github.com/zeit/next.js) to build applications.

## Supported development environment

- Supports React 16 +
- Supports [TypeScript](http://www.typescriptlang.org/)
- Supports [Electron](https://electronjs.org/)
- Supports [Reason](https://github.com/shurygindv/bs-rsuite-ui-react)

## Installation

React Suite is available as an [npm package][npm-home].

```bash
npm i rsuite@next --save
```

or if you prefer Yarn

```bash
yarn add rsuite@next
```

## Usage

Here's a simple example

```js
import { Button } from 'rsuite';
import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'

ReactDOM.render(<Button>Button</Button>, mountNode);
```

[**Live preview on CodeSandbox**][live-preview-on-codesandbox]

### Documentation

You can go through [full documentation][rsuite-doc-guide] or start with following sections

- [Quick start][rsuite-doc-guide]
- [Customizing themes][rsuite-doc-guide-themes]
- [Internationalization][rsuite-doc-guide-intl]
- [Right-to-left][rsuite-doc-guide-rtl]
- [Components][rsuite-components-overview]

**Previous old version**

- [Version 3.\*](https://v3.rsuitejs.com/)
- [Version 2.\*](https://v2.rsuitejs.com/)

### Examples

- [Management system][demo-admin]
- [Use modularized][demo-modular-import]
- [Use CDN][demo-cdn]
- [Internationalization][demo-intl-app]
- [Themes][demo-multiple-themes]
- [RTL - RTLCSS][demo-rtlcss]
- [RTL - PostCSS-RTL][demo-postcss-rtl]
- [Use in create-react-app][demo-create-react-app]
- [Use in Electron][demo-electron]
- [Use in Flow][demo-flow-app]
- [Use in TypeScript][demo-typescript-app]
- [Use in Next.js][demo-nextjs]
- [Use in Next.js and Typescript][demo-nextjs-typescript]
- [Use in UmiJS][demo-umi-app]
- [Use in Snowpack][demo-snowpack]
- [Use in Vite][demo-vite]

## Changelog

Detailed changes for each release are documented in the [release notes][release-notes].

## Development

### Test-Driven Development（TDD）

1. Fork `https://github.com/rsuite/rsuite` this repo.

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
$ cd rsuite
```

2. Install it and run

```bash
$ npm i
$ npm run tdd
```

3. Run a single component test case.

```bash
$ M=Button npm run tdd
```

### UI-Driven Development

1. Fork `https://github.com/rsuite/rsuite` this repo.

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
```

2. Install it and run

```bash
$ npm i
$ npm run dev
```

3. Your show time. Open url http://127.0.0.1:3000/ in browser.

## Contribution

Make sure you've read the [guidelines][contributing] before you start contributing.

Editor preferences are available in the [.prettierrc][prettierrc] for easy use in common code editors. Read more and download plugins at https://prettier.io/.

## Supporting React Suite

If you like React Suite, you can show your support by either

- Starring this repo
- [Leaving a comment here][issues-11] if you are using React Suite in your project (like we do :smile:)
- [Becoming a backer][opencollective-home] on OpenCollective

This project exists thanks to all the people who contribute.

<a href="https://github.com/rsuite/rsuite/graphs/contributors" target="_blank">
  <img src="https://opencollective.com/rsuite/contributors.svg?width=890" />
</a>

## License

React Suite is [MIT licensed][license]. Copyright (c) 2016-present, HYPERS.

[readm-cn]: https://github.com/rsuite/rsuite/blob/master/README_zh.md
[npm-svg]: https://img.shields.io/npm/v/rsuite/next
[npm-home]: https://www.npmjs.com/package/rsuite
[actions-svg]: https://github.com/rsuite/rsuite/workflows/Node.js%20CI/badge.svg?branch=master
[actions-home]: https://github.com/rsuite/rsuite/actions?query=branch%3Amaster+workflow%3A%22Node.js+CI%22
[coverage-home]: https://coveralls.io/github/rsuite/rsuite?branch=master
[discord-svg]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]: https://discord.gg/R8mnjwh
[rsuite-design]: https://rsuitejs.com/design/default
[live-preview-on-codesandbox]: https://codesandbox.io/s/mo7jxvr9x9?from-embed
[rsuite-doc-guide]: https://rsuitejs.com/en/guide/introduction
[rsuite-doc-guide-themes]: https://rsuitejs.com/en/guide/themes
[rsuite-doc-guide-intl]: https://rsuitejs.com/en/guide/intl
[rsuite-doc-guide-rtl]: https://rsuitejs.com/en/guide/rtl
[rsuite-components-overview]: https://rsuitejs.com/en/components/overview
[release-notes]: https://github.com/rsuite/rsuite/releases
[contributing]: https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.md
[prettierrc]: https://github.com/rsuite/rsuite/wiki/.prettierrc
[issues-11]: https://github.com/rsuite/rsuite/issues/11
[opencollective-svg]: https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36
[opencollective-home]: https://opencollective.com/rsuite
[license]: https://github.com/rsuite/rsuite/blob/master/LICENSE
[rsuite-sample]: https://sample.rsuitejs.com/
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
[demo-nextjs-typescript]: https://github.com/rsuite/rsuite/tree/master/examples/with-next-typescript
[demo-snowpack]: https://github.com/rsuite/rsuite/tree/master/examples/with-snowpack
[demo-vite]: https://github.com/rsuite/rsuite/tree/master/examples/with-vite
