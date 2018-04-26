English | [中文版](https://github.com/rsuite/rsuite/blob/master/README_zh.md)


<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img width="100" src="https://user-images.githubusercontent.com/1203827/39026518-277950c4-4480-11e8-8109-42fbb0f2f7b5.png" alt="RSUITE logo">
  </a>
</p>


# RSUITE 

[![npm](https://badge.fury.io/js/rsuite.svg)](https://www.npmjs.com/package/rsuite)
[![Travis](https://travis-ci.org/rsuite/rsuite.svg?branch=master)](https://travis-ci.org/rsuite/rsuite)
[![Coverage Status](https://coveralls.io/repos/github/rsuite/rsuite/badge.svg?branch=next)](https://coveralls.io/github/rsuite/rsuite?branch=next)

[![Discord](https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg)](https://discord.gg/GmPXTH3)


RSUITE (React Suite) is a set of react component libraries for enterprise system products. Built by HYPERS front-end team and UX team, mainly serving company's big data products.

After three major revisions, a large number of components and rich functionality have been accumulated.

### Browser Compatibility

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=10 | >=14 | >= 45   | >= 49  | >= 10  |

 - IE<=9 is no longer supported since RSUITE 3.0. 
 - RSUITE is designed and implemented for use on modern desktop browsers rather than mobile browsers.

### UI Design

RSUITE Design Prototype and specification, click to [view](https://rsuitejs.com/design/index.html)


## Installation

RSUITE is available as an [npm package](https://www.npmjs.com/package/rsuite).

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

[**Live preview on CodeSandbox**](https://codesandbox.io/s/mo7jxvr9x9?from-embed)

### Documentaion

You can go through [full documentation](https://rsuitejs.com/guide/introduction) or start with following sections

* [Quick start](https://rsuitejs.com/guide/usage)
* [Customizing themes](https://rsuitejs.com/guide/themes)
* [Internationalization](https://rsuitejs.com/guide/intl)
* [Components](https://rsuitejs.com/components/overview)


## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/rsuite/rsuite/releases).


## Contribution

Make sure you've read the [guidelines](https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.md) before you start contributing.

Editor preferences are available in the [.prettierrc](https://github.com/rsuite/rsuite/wiki/.prettierrc) for easy use in common code editors. Read more and download plugins at https://prettier.io/.


## Supporting RSUITE

If you like RSUITE, you can show your support by either

- Starring this repo
- [Leaving a comment here](https://github.com/rsuite/rsuite/issues/11) if you are using RSUITE in your project (like we do :smile:)
- Becomiong a backer on OpenCollective

[<img src="https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36">](https://opencollective.com/rsuite)


## License

RSUITE is [MIT licensed](https://github.com/rsuite/rsuite/blob/master/LICENSE). Copyright (c) 2016-present, HYPERS
