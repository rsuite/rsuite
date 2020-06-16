### Custom Icon

<!--start-code-->

```js
const instance = (
  <Steps current={1}>
    <Steps.Item title="Finished" icon={<Icon icon="pencil-square" size="lg" />} />
    <Steps.Item title="In Progress" icon={<Icon icon="book" size="lg" />} />
    <Steps.Item title="Waiting" icon={<Icon icon="wechat" size="lg" />} />
    <Steps.Item title="Waiting" icon={<Icon icon="steam-square" size="lg" />} />
  </Steps>
);
ReactDOM.render(instance);
```

<!--end-code-->
