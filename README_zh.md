[English][readm-en] | 中文版


<p align="center">
  <a href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
   <img height="100" src="https://user-images.githubusercontent.com/15609339/39298633-53826e50-4979-11e8-99fa-fac162d0830e.png" alt="RSUITE logo">
  </a>
</p>


[![npm][npm-svg]][npm-home] [![Travis][travis-svg]][travis-home] [![Coverage Status][coverage-svg]][travis-home] [![Discord][discord-svg]][discord-invite] [![Gitter][gitter-svg]][gitter]

RSUITE（React Suite 的简写）是一套 React 组件库，为后台产品而生。由 HYPERS 前端团队与 UX 团队打造，主要服务于公司大数据产品线。经历了三次大的版本更新后，累积了大量的组件和丰富的功能。

### 浏览器兼容性

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=10 | >=14 | >= 45   | >= 49  | >= 10  |

- 从 RSUITE 3.0 开始不支持 IE9 以下版本(包括 IE9)， 其他现代桌面浏览器都支持。
- 不推荐在移动端使用。

### UI Design

RSUITE 设计原型与规范, [点击查看][rsuite-design]


## 安装

RSUITE 可通过 [npm][npm-home] 安装.

```bash
npm i rsuite --save
```


## 使用

这里有一个简单的示例：

```js
import { Button } from 'rsuite';
import 'rsuite/styles/less/index.less'; // 或者 'rsuite/dist/styles/rsuite.min.css'

ReactDOM.render(<Button>Button</Button>, mountNode);
```

您可以在 [CodeSandbox][live-preview-on-codesandbox] 上查看该示例。

### 文档

[国内镜像站点 🇨🇳 ][rsuite-gitee]

您可以阅读[完整文档][rsuite-doc-guide]，或者从下面几个章节开始学习

* [如何使用？][rsuite-doc-guide]
* [自定义主题][rsuite-doc-guide-themes]
* [国际化][rsuite-doc-guide-intl]
* [组件][rsuite-components-overview]


### 示例

- [管理系统][demo-admin]
- [模块化按需加载][demo-modular-import]
- [CDN 引入][demo-cdn]

## 更新日志

每一个版本的详细变化记录在[Release Notes][release-notes]


## 开发

您可以通过 [Trello](https://trello.com/b/nsaUoK7S/rsuite) 查看我们的开发计划，同时希望您能参与其中。


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

3. 您可以开始访问了， 在浏览器输入 http://127.0.0.1:3200/ 。


## 贡献

在开始之前，确保您已读[贡献指南][contributing]。

编辑器的配置参考 [.prettierrc][prettierrc]， 下载编辑的插件 https://prettier.io/。


## 支持 RSUITE

如果您喜欢 RSUITE，可以通过以下方式支持我们

- Star 这个项目
- 如果您在您的项目中使用了 RSUITE，欢迎在这里[留言][issues-11]！
- 在 [OpenCollective](https://opencollective.com/rsuite#) 上赞助我们

[![opencollective-now][opencollective-svg]][opencollective-home]


## License

RSUITE 基于 [MIT licensed][LICENSE] 发布。

[readm-en]:https://github.com/rsuite/rsuite/blob/master/README.md
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
[contributing]:https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.zh-CN.md
[prettierrc]:https://github.com/rsuite/rsuite/wiki/.prettierrc
[issues-11]:https://github.com/rsuite/rsuite/issues/11
[opencollective-svg]:https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36
[opencollective-home]:https://opencollective.com/rsuite
[LICENSE]:https://github.com/rsuite/rsuite/blob/master/LICENSE
[rsuite-gitee]:http://rsuite.gitee.io/
[gitter]:https://gitter.im/rsuite/rsuite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[gitter-svg]:https://badges.gitter.im/rsuite/rsuite.svg
[demo-admin]:https://github.com/rsuite/rsuite-management-system
[demo-modular-import]:https://github.com/rsuite/examples/tree/modular/modular-import
[demo-cdn]:https://github.com/rsuite/examples/tree/master/cdn
