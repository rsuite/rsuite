
### 安装

`Suite` 是基于 [React](http://facebook.github.io/react/) 开发的一套UI组件，需安装 `React` ，然后安装 Suite。

```
npm install react --save
npm install rsuite --save
```


### Javascript

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

### CSS
```html
<link rel="stylesheet" href="//t.hypers.com.cn/libs/rsuite/css/0.1.0/rsuite.min.css">
```
[code](https://github.com/rsuite/rsuite-theme-pagurian)

### 浏览器支持

针对IE8及以下的浏览器，需要引入 `html5shiv`、`es5-shim`, 来处理对 `HTML5 标签`、`ECMAScript5` 兼容性问题

```html
<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
<![endif]-->
```
