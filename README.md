<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img src="https://user-images.githubusercontent.com/1203827/44192693-0440f400-a163-11e8-9d7c-0cc55797e0cb.png" alt="RSUITE logo">
  </a>
</p>

English | [中文版][readm-cn]

[![npm][npm-svg]][npm-home] [![Travis][travis-svg]][travis-home] [![Coverage Status][coverage-svg]][coverage-home] [![Discord][discord-svg]][discord-invite] [![Gitter][gitter-svg]][gitter]

RSUITE (React Suite) is a set of react component libraries for enterprise system products. Built by HYPERS front-end team and UX team, mainly serving company's big data products.

After three major revisions, a large number of components and rich functionality have been accumulated.

### Browser Compatibility

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=10 | >=14 | >= 45   | >= 49  | >= 10  |

 - IE<=9 is no longer supported since RSUITE 3.0.
 - RSUITE is designed and implemented for use on modern desktop browsers rather than mobile browsers.

### UI Design

RSUITE Design Prototype and specification, click to [view][rsuite-design]


## Installation

RSUITE is available as an [npm package][npm-home].

```bash
npm i rsuite --save
```

or if you prefer Yarn

```bash
yarn add rsuite
```

## Usage

Here's a simple example

```js
import { Button } from 'rsuite';
import 'rsuite/styles/less/index.less'; // or 'rsuite/dist/styles/rsuite.min.css'

ReactDOM.render(<Button>Button</Button>, mountNode);
```

[**Live preview on CodeSandbox**][live-preview-on-codesandbox]

### Documentation

[China Mirror 🇨🇳 ][rsuite-gitee]

You can go through [full documentation][rsuite-doc-guide] or start with following sections

* [Quick start][rsuite-doc-guide]
* [Customizing themes][rsuite-doc-guide-themes]
* [Internationalization][rsuite-doc-guide-intl]
* [Components][rsuite-components-overview]

### Examples

- [Management system][demo-admin]
- [Use modularized][demo-modular-import]
- [Use CDN][demo-cdn]
- [Internationalization][demo-intl-app]
- [Themes][demo-multiple-themes]
- [Use in create-react-app][demo-create-react-app]
- [Use in Flow][demo-flow-app]
- [Use in TypeScript][demo-typescript-app]

## Changelog

Detailed changes for each release are documented in the [release notes][release-notes].


## Development

You can learn about our development plan through [Trello](https://trello.com/b/nsaUoK7S/rsuite) and hope that you can get involved.


1. Fork `https://github.com/rsuite/rsuite` this repo.

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.git
$ cd rsuite
$ npm install
$ npm run dev
```

2. Fork `https://github.com/rsuite/rsuite.github.io` this repo.

```bash
$ git clone git@github.com:<YOUR NAME>/rsuite.github.io.git
$ cd rsuite.github.io
$ npm install
$ npm run dev
```

3. Your show time. Open url http://127.0.0.1:3200/ in browser.


## Contribution

Make sure you've read the [guidelines][contributing] before you start contributing.

Editor preferences are available in the [.prettierrc][prettierrc] for easy use in common code editors. Read more and download plugins at https://prettier.io/.



## Supporting RSUITE

If you like RSUITE, you can show your support by either

- Starring this repo
- [Leaving a comment here][issues-11] if you are using RSUITE in your project (like we do :smile:)
- [Becoming a backer][opencollective-home] on OpenCollective

[![opencollective-now][opencollective-svg]][opencollective-home]

## License

RSUITE is [MIT licensed][LICENSE]. Copyright (c) 2016-present, HYPERS.

[readm-cn]:https://github.com/rsuite/rsuite/blob/master/README_zh.md
[npm-svg]:https://badge.fury.io/js/rsuite.svg
[npm-home]:https://www.npmjs.com/package/rsuite
[travis-svg]:https://travis-ci.org/rsuite/rsuite.svg?branch=master
[travis-home]:https://travis-ci.org/rsuite/rsuite
[coverage-svg]:https://coveralls.io/repos/github/rsuite/rsuite/badge.svg?branch=master
[coverage-home]:https://coveralls.io/github/rsuite/rsuite?branch=master
[discord-svg]:https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]:https://discord.gg/R8mnjwh
[rsuite-design]:https://rsuitejs.com/design/index.html
[live-preview-on-codesandbox]:https://codesandbox.io/s/mo7jxvr9x9?from-embed
[rsuite-doc-guide]:https://rsuitejs.com/en/guide/introduction
[rsuite-doc-guide-themes]:https://rsuitejs.com/en/guide/themes
[rsuite-doc-guide-intl]:https://rsuitejs.com/en/guide/intl
[rsuite-components-overview]:https://rsuitejs.com/en/components/overview
[release-notes]:https://github.com/rsuite/rsuite/releases
[contributing]:https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.md
[prettierrc]:https://github.com/rsuite/rsuite/wiki/.prettierrc
[issues-11]:https://github.com/rsuite/rsuite/issues/11
[opencollective-svg]:https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36
[opencollective-home]:https://opencollective.com/rsuite
[LICENSE]:https://github.com/rsuite/rsuite/blob/master/LICENSE
[rsuite-gitee]:http://rsuite.gitee.io/
[rsuite-sample]:https://sample.rsuitejs.com/
[gitter]:https://gitter.im/rsuite/rsuite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter-svg]:https://badges.gitter.im/rsuite/rsuite.svg
[demo-admin]:https://github.com/rsuite/rsuite-management-system
[demo-modular-import]:https://github.com/rsuite/examples/tree/master/modular-import
[demo-cdn]:https://github.com/rsuite/examples/tree/master/cdn
[demo-create-react-app]:https://github.com/rsuite/examples/tree/master/create-react-app
[demo-intl-app]:https://github.com/rsuite/examples/tree/master/intl-app
[demo-multiple-themes]:https://github.com/rsuite/examples/tree/master/multiple-themes
[demo-flow-app]:https://github.com/rsuite/examples/tree/master/flow-app
[demo-typescript-app]:https://github.com/rsuite/examples/tree/master/typescript-app
