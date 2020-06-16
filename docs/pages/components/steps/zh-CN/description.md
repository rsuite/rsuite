### 设置描述

<!--start-code-->

```js
const instance = (
  <Steps current={1}>
    <Steps.Item title="Finished" description="This is a description." />
    <Steps.Item title="In Progress" description="This is a description." />
    <Steps.Item title="Waiting" description="This is a description." />
    <Steps.Item title="Waiting" description="This is a description." />
  </Steps>
);
ReactDOM.render(instance);
```

<!--end-code-->
