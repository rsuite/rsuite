### 文字

您可以使用 `style` 来改变 `<Avatar>` 的背景色和文字颜色。

<!--start-code-->

```js
const instance = (
  <div className="avatar-group">
    <Avatar>RS</Avatar>
    <Avatar style={{ background: '#7B1FA2' }}>RS</Avatar>
    <Avatar style={{ background: '#edfae1', color: '#4caf50' }}>RS</Avatar>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
