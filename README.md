# RSUITE  [![Travis][build-badge]][build] [![npm][npm-badge]][npm]
[![Discord][discord-badge]][discord]


RSUITE  `[ɑː(r)swiːt]` 是一套 React 开发的 UI 组件库，提供 Bootstrap 设计体系的常用组件，并且会在此基础上持续开发一些高级组件。

我们的目标就是让 WEB 开发更快捷，同时具有一定的灵活性和扩展性。


<br/>



加入 [![Discord](https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg)](https://discord.gg/GmPXTH3)
 ，直接与开发者沟通。

<br/>

#### 特性

- 基于 React 组件化开发模式
- 丰富、漂亮 UI 组件
- 支持多主题切换
- 支持响应式布局
- 支持 ES2015

<br/>

#### 版本

[![npm](https://badge.fury.io/js/rsuite.svg)](https://www.npmjs.com/package/rsuite)
[![Travis](https://travis-ci.org/rsuite/rsuite.svg?branch=master)](https://travis-ci.org/rsuite/rsuite)


<br/>
#### 安装

```
npm install rsuite --save
```


示例：

```js
// ES2015
const { Button } = require('rsuite');

// CommonJS
var Button = require('rsuite').Button;

// AMD
define(['rsuite'], function(Suite) {
  var Button = Suite.Button;
  ...
});


ReactDOM.render(<Button>Button</Button>, mountNode);
```

#### 主题

- 可以直接引入css

```html
<link rel="stylesheet" href="//t.hypers.com.cn/libs/rsuite/css/0.1.0/rsuite.min.css">
```

- 可以通过 [rsuite-theme](https://github.com/rsuite/rsuite-theme) 管理，只需要配置一个系统主色，自动生成系统配色方案。

<br/>
#### 浏览器支持

针对IE8及以下的浏览器，需要引入 `html5shiv`、`es5-shim`, 来处理对 `HTML5 标签`、`ECMAScript5` 兼容性问题

```html
<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
<![endif]-->
```


### 贡献

用 GitHub issues 提交你贡献的代码，我们积极欢迎你的参与。

###  更新日志

更新日志查看  GitHub releases。

### License

MIT


[build-badge]: https://travis-ci.org/rsuite/rsuite.svg?branch=master
[build]: https://travis-ci.org/rsuite/rsuite


[npm-badge]: https://badge.fury.io/js/rsuite.svg
[npm]: http://badge.fury.io/js/rsuite


[discord-badge]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord]: https://discord.gg/GmPXTH3
