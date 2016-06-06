# Suite


`Suite` 是一个基于 React.js 开发的 Web 组件库，参考 Bootstrap 设计，提供其中常用组件，支持响应式布局。

我们的目标就是让 WEB 开发更快捷，同时具有一定的灵活性和扩展性。



### 一个简单的例子:


通过 `npm` 安装

```
npm install suite
```

**CSS：** 我们提供一些主题, 载入对应的 CSS 资源到你的页面中，同时你也可以直接引用 Bootstrap 的 CSS 。


**Javascript：** 比如在项目中用到一个 `Button`， 可以通过 `ES2015`、`CommonJS`、`AMD` 任意一种方式引入组件。
```js
// ES2015
const { Button } = require('suite');

// CommonJS
var Button = require('suite').Button;

// AMD
define(['suite'], function(Suite) {
  var Button = Suite.Button;
  ...
});


ReactDOM.render(
    <Button shape="primary" >Button</Button>,
    document.getElementById('example')
);
```

**HTML：** 对应生成的 HTML 代码
```html
<button class="btn btn-primary" type="button" >Primary</button>
```


### 贡献

用 GitHub issues 提交你贡献的代码，我们积极欢迎你的参与。

###  更新日志

更新日志查看  GitHub releases。

### License

Suite 是 MIT-licensed。
