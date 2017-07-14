# [RSUITE](https://rsuite.github.io)  [![Travis][build-badge]][build] [![npm][npm-badge]][npm]
[![Discord][discord-badge]][discord]


RSUITE  `[ɑː(r)swiːt]` 是一套 React 开发的 UI 组件库，提供 Bootstrap 设计体系的常用组件，并且会在此基础上持续开发一些高级组件。

我们的目标就是让 WEB 开发更快捷，同时具有一定的灵活性和扩展性。



## 特性

- 基于 React 组件化开发模式；
- 丰富、漂亮 UI 组件；
- 支持多主题切换；
- 支持响应式布局；
- 支持 ES2015。



## 版本

[![npm](https://badge.fury.io/js/rsuite.svg)](https://www.npmjs.com/package/rsuite)
[![Travis](https://travis-ci.org/rsuite/rsuite.svg?branch=master)](https://travis-ci.org/rsuite/rsuite)



## 安装

```
npm install rsuite --save
```


示例：

```js
// ES2015
import { Button } from 'rsuite';

// CommonJS
var Button = require('rsuite').Button;

// AMD
define(['rsuite'], function(Suite) {
  var Button = Suite.Button;
  ...
});


ReactDOM.render(<Button>Button</Button>, mountNode);
```

## 主题

- 可以通过 [rsuite-theme](https://github.com/rsuite/rsuite-theme) 管理，只需要配置一个系统主色，自动生成系统配色方案。

安装
```
npm install rsuite-theme --save
```
`import`
```js
import 'rsuite-theme/dist/less/rsuite.less';
```

- 也可以通过 CDN 引入 css 文件

```html
<link rel="stylesheet" href="https://unpkg.com/rsuite-theme/dist/css/rsuite.min.css" />
```


## 其他组件

- [rsuite-table](https://github.com/rsuite/rsuite-table)
- [rsuite-datepicker](https://github.com/rsuite/rsuite-datepicker)
- [rsuite-daterangepicker](https://github.com/rsuite/rsuite-daterangepicker)
- [rsuite-picker](https://github.com/rsuite/rsuite-picker)
- [rsuite-echarts](https://github.com/rsuite/rsuite-echarts)
- [rsuite-uploader](https://github.com/rsuite/rsuite-uploader)
- [rsuite-tree](https://github.com/rsuite/rsuite-tree)
- [rsuite-slider](https://github.com/rsuite/rsuite-slider)
- [rsuite-affix](https://github.com/rsuite/rsuite-affix)
- [rsuite-autocomplete](https://github.com/rsuite/rsuite-autocomplete)


## License

MIT


[build-badge]: https://travis-ci.org/rsuite/rsuite.svg?branch=master
[build]: https://travis-ci.org/rsuite/rsuite


[npm-badge]: https://badge.fury.io/js/rsuite.svg
[npm]: http://badge.fury.io/js/rsuite


[discord-badge]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord]: https://discord.gg/GmPXTH3
