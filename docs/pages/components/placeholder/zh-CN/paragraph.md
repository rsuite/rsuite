### 段落

<!--start-code-->

```js
const { Paragraph } = Placeholder;
const instance = (
  <div>
    <p>默认的段落占位符：</p>
    <Paragraph style={{ marginTop: 30 }} />
    <hr />
    <p>您也可以在之前加上圆形或方形的图标：</p>
    <Paragraph style={{ marginTop: 30 }} graph="circle" />
    <Paragraph style={{ marginTop: 30 }} graph="square" />
    <Paragraph style={{ marginTop: 30 }} graph="image" />
    <hr />
    <p>除此之外还可以自定义行数、间距等：</p>
    <Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
