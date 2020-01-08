# Introduction

[![npm][npm-svg]][npm-home] [![Travis][travis-svg]][travis-home] [![Coverage Status][coverage-svg]][coverage-home] [![Gitter][gitter-svg]][gitter]

React Suite is a library of React components. Committed to creating intimate interactive designs while providing developers with a friendly development experience.

## UI Design

RSUITE Design Prototype and specification, click to [view][rsuite-design]

## Supported Platforms

### Browser

- React Suite supports all major modern browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /></br>IE | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /></br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /> </br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >=10                                                                                                                                                 | >= 14                                                                                                                                                  | >= 45                                                                                                                                                         | >=49                                                                                                                                                       | >=10                                                                                                                                                      |

- ** IE<=9 is no longer supported ** since React Suite 3.0.
- Our support for IE10 has been gracefully downgraded, and some styles and animations have been simplified.

  > Notice: For IE series browsers, you need to provide support using Polyfill. We recommend using [babel-preset-env][babel-preset-env] to handle browser compatibility issues.

- React Suite is designed and implemented for use on modern desktop browsers rather than mobile browsers.

### Server

React Suite supports server side rendering. Support [Next.js](https://github.com/zeit/next.js) to build applications.

## Supported development environment

- Supports React 16 +
- Supports [TypeScript](http://www.typescriptlang.org/)
- Supports [Flow](https://flow.org/)
- Supports [Electron](https://electronjs.org/)

## Examples

- [Management system][demo-admin]
- [Use modularized][demo-modular-import]
- [Use CDN][demo-cdn]
- [Internationalization][demo-intl-app]
- [Themes][demo-multiple-themes]
- [Use in create-react-app][demo-create-react-app]
- [Use in Flow][demo-flow-app]
- [Use in TypeScript][demo-typescript-app]
- [Use in Next.js][demo-ssr-app]
- [Use in UmiJS][demo-umi-app]

## Changelog

Detailed changes for each release are documented in the [release notes][release-notes].

## Contribution

Make sure you've read the [guidelines][contributing] before you start contributing.

Editor preferences are available in the [.prettierrc][prettierrc] for easy use in common code editors. Read more and download plugins at https://prettier.io/.

### Development plan

You can learn about our development plan through [Trello](https://trello.com/b/nsaUoK7S/rsuite) and hope that you can get involved.

## Supporting RSUITE

If you like RSUITE, you can show your support by either

- Star this repo [![rsuite-stars][rsuite-stars]](https://github.com/rsuite/rsuite)
- [Leaving a comment here][issues-11] if you are using RSUITE in your project (like we do 😄)
- [Becoming a backer][opencollective-home] on OpenCollective

[![opencollective-now][opencollective-svg]][opencollective-home]

## License

RSUITE is [MIT licensed][license]. Copyright (c) 2016-present, HYPERS.

[readm-cn]: https://github.com/rsuite/rsuite/blob/master/README_zh.md
[npm-svg]: https://badge.fury.io/js/rsuite.svg
[npm-home]: https://www.npmjs.com/package/rsuite
[travis-svg]: https://travis-ci.org/rsuite/rsuite.svg?branch=master
[travis-home]: https://travis-ci.org/rsuite/rsuite
[coverage-svg]: https://coveralls.io/repos/github/rsuite/rsuite/badge.svg?branch=master
[coverage-home]: https://coveralls.io/github/rsuite/rsuite?branch=master
[discord-svg]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord-invite]: https://discord.gg/R8mnjwh
[rsuite-design]: https://rsuitejs.com/design/default/index.html
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
[demo-umi-app]: https://github.com/rsuite/examples/tree/master/umi-app
[babel-preset-env]: https://babeljs.io/docs/en/babel-preset-env
[rsuite-stars]: https://img.shields.io/github/stars/rsuite/rsuite?style=social
