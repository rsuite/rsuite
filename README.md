English | [中文版][readm-cn]


<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img height="100" src="https://user-images.githubusercontent.com/15609339/39298633-53826e50-4979-11e8-99fa-fac162d0830e.png" alt="RSUITE logo">
  </a>
</p>


[![npm][npm-svg]][npm-home] [![Travis][travis-svg]][travis-home] [![Coverage Status][coverage-svg]][travis-home] [![Discord][discord-svg]][discord-invite]

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

import '~rsuite/lib/less/index.less';

ReactDOM.render(<Button>Button</Button>, mountNode);
```

[**Live preview on CodeSandbox**][live-preview-on-codesandbox]

### Documentation

You can go through [full documentation][rsuite-doc-guide] or start with following sections

* [Quick start][rsuite-doc-guide]
* [Customizing themes][rsuite-doc-guide-themes]
* [Internationalization][rsuite-doc-guide-intl]
* [Components][rsuite-components-overview]


## Changelog

Detailed changes for each release are documented in the [release notes][release-notes].


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
[travis-home]:https://coveralls.io/github/rsuite/rsuite?branch=master
[discord-svg]:https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]:https://discord.gg/R8mnjwh
[rsuite-design]:https://rsuitejs.com/design/index.html
[live-preview-on-codesandbox]:https://codesandbox.io/s/mo7jxvr9x9?from-embed
[rsuite-doc-guide]:https://rsuitejs.com/guide/introduction
[rsuite-doc-guide-themes]:https://rsuitejs.com/guide/themes
[rsuite-doc-guide-intl]:https://rsuitejs.com/guide/intl
[rsuite-components-overview]:https://rsuitejs.com/components/overview
[release-notes]:https://github.com/rsuite/rsuite/releases
[contributing]:https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.md
[prettierrc]:https://github.com/rsuite/rsuite/wiki/.prettierrc
[issues-11]:https://github.com/rsuite/rsuite/issues/11
[opencollective-svg]:https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36
[opencollective-home]:https://opencollective.com/rsuite
[LICENSE]:https://github.com/rsuite/rsuite/blob/master/LICENSE
