### 延迟关闭

duration 是一个可选项，当设置为 0 时，则不自动关闭。

<!--start-code-->

```js
function open() {
  Notification.open({
    title: 'Notify',
    duration: 20000,
    description: <Paragraph style={{ width: 320 }} rows={3} />
  });
}

const instance = (
  <ButtonToolbar>
    <Button onClick={open}> Open </Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
