### `<ul>`：HTML 无序列表元素

展示一个内可含多个元素的无序列表或项目符号列表。

<!--start-code-->

```js
const instance = (
  <div>
    <p>简单示例:</p>
    <ul>
      <li>第一项</li>
      <li>第二项</li>
      <li>第三项</li>
    </ul>
    <hr />

    <p>嵌套列表:</p>
    <ul>
      <li>第一项</li>
      <li>
        第二项
        <ul>
          <li>第二项的第一子项</li>
          <li>
            第二项的第二子项
            <ul>
              <li>第二项的第二子项第第一子项</li>
              <li>第二项的第二子项第第二子项</li>
              <li>第二项的第二子项第第三子项</li>
            </ul>
          </li>
          <li>第二项的第三子项</li>
        </ul>
      </li>
      <li>第三项</li>
    </ul>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
