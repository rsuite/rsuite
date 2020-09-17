### 禁用的元素

具有禁用属性的元素禁用后无法将鼠标悬停或单击它们来触发弹出 `Tooltip`。 解决方法是，您要可以通过包装 `<div>` 或 `<span>` 触发叠加层。

<!--start-code-->

```js
const instance = (
  <Whisper speaker={<Tooltip> Tooltip!</Tooltip>}>
    <span>
      <Button disabled>button</Button>
    </span>
  </Whisper>
);
ReactDOM.render(instance);
```

<!--end-code-->
