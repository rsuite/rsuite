### `<p>`：HTML 段落元素

显示文本的一个段落。

<!--start-code-->

```js
const instance = (
  <div>
    <p>这是第一个段落。这是第一个段落。 这是第一个段落。这是第一个段落。</p>
    <hr />
    <p>
      您可以使用标记标记<mark>突出显示</mark>文本。
    </p>
    <p>
      <del>此行文本旨在被视为已删除的文本。</del>
    </p>
    <p>
      <s>这一行文本被视为不再准确。</s>
    </p>
    <p>
      <ins>这一行文本被视为文档的补充。</ins>
    </p>
    <p>
      <u>此行文本将呈现为带下划线。</u>
    </p>
    <p>
      <small>这行文字旨在被视为精美的印刷品。</small>
    </p>
    <p>
      <strong>此行呈现为粗体文本。</strong>
    </p>
    <p>
      <em>此行呈现为斜体文本。</em>
    </p>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
