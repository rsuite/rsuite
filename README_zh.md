[English](https://github.com/rsuite/rsuite/blob/master/README_zh.md) | 中文版


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

RSUITE（React Suite 的简写）是一套 React 组件库，为后台产品而生。由 HYPERS 前端团队与 UX 团队打造，主要服务于公司大数据产品线。经历了三次大的版本更新后，累积了大量的组件和丰富的功能。

### 浏览器兼容性

| IE   | Edge | Firefox | Chrome | Safari |
| ---- | ---- | ------- | ------ | ------ |
| >=10 | >=14 | >= 45   | >= 49  | >= 10  |

- 从 RSUITE 3.0 开始不支持 IE9 以下版本(包括 IE9)， 其他现代桌面浏览器都支持。
- 不推荐在移动端使用。

### UI Design

RSUITE 设计原型与规范, [点击查看](https://rsuitejs.com/design/index.html)


## 安装

RSUITE 可通过 [npm](https://www.npmjs.com/package/rsuite) 安装.

```bash
npm i rsuite --save
```


## 使用

这里有一个简单的示例：

```js
import { Button } from 'rsuite';

import '~rsuite/lib/less/index.less';

ReactDOM.render(<Button>Button</Button>, mountNode);
```

你可以在 [CodeSandbox](https://codesandbox.io/s/mo7jxvr9x9?from-embed) 上查看该示例。

### 文档

你可以阅读[完整文档](https://rsuitejs.com/guide/introduction)，或者从下面几个章节开始学习

* [如何使用？](https://rsuitejs.com/guide/usage)
* [自定义主题](https://rsuitejs.com/guide/themes)
* [国际化](https://rsuitejs.com/guide/intl)
* [组件](https://rsuitejs.com/components/overview)


## 更新日志

详见 [Release Notes](https://github.com/rsuite/rsuite/releases)


## 贡献

请阅读[贡献指南](https://github.com/rsuite/rsuite/blob/master/CONTRIBUTING.zh-CN.md)。

编辑器的配置参考 [.prettierrc](https://github.com/rsuite/rsuite/wiki/.prettierrc)， 下载编辑的插件 https://prettier.io/。


## 支持 RSUITE

如果你喜欢 RSUITE，可以通过以下方式支持我们

- Star 这个项目
- 如果你在你的项目中使用了 RSUITE，欢迎在这里[留言](https://github.com/rsuite/rsuite/issues/11)！
- 在 [OpenCollective](https://opencollective.com/rsuite#) 上赞助我们

[<img src="https://opencollective.com/rsuite/tiers/backer.svg?avatarHeight=36">](https://opencollective.com/rsuite)


## License

RSUITE 基于 [MIT license](https://github.com/rsuite/rsuite/blob/master/LICENSE) 发布。
