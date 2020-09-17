### 延迟关闭

duration 是一个可选项，当设置为 0 时，则不自动关闭。

```
Alert.info(content: string, duration?: number, onClose?: () => void);
```

<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Button onClick={() => Alert.info('This is a informations.', 5000)}> Info </Button>
    <Button onClick={() => Alert.success('This is a successful message.', 5000)}> Success </Button>
    <Button onClick={() => Alert.warning('This is a warning notice.', 5000)}> Warning </Button>
    <Button onClick={() => Alert.error('This is an error message.', 5000)}> Error </Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
