### `<a>`：HTML 锚元素

在组件中提供了 Button 可以创建一个`<a>`元素，同时您也可以在应用中直接使用 `<a>`元素，去可以创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。

<!--start-code-->

```js
const instance = (
  <div>
    <p>您可以通过:</p>
    <p>
      <a href="https://example.com">网站</a>
    </p>
    <p>
      <a href="mailto:m.bluth@example.com">邮箱</a>
    </p>
    <p>
      <a href="tel:+123456789">电话</a>
    </p>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
