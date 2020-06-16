### Error Status

<!--start-code-->

```js
const instance = (
  <Steps current={1} currentStatus="error">
    <Steps.Item title="Finished" />
    <Steps.Item title="In progress" />
    <Steps.Item title="Waiting" />
    <Steps.Item title="Waiting" />
  </Steps>
);
ReactDOM.render(instance);
```

<!--end-code-->
