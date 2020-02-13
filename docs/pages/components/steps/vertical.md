### 垂直布局

<!--start-code-->

```js
const styles = {
  width: '200px',
  display: 'inline-table',
  verticalAlign: 'top'
};

const instance = (
  <div>
    <Steps current={1} vertical style={styles}>
      <Steps.Item title="Finished" />
      <Steps.Item title="In progress" />
      <Steps.Item title="Waiting" />
      <Steps.Item title="Waiting" />
    </Steps>

    <Steps current={1} vertical style={styles}>
      <Steps.Item title="Finished" description="Description" />
      <Steps.Item title="In Progress" description="Description" />
      <Steps.Item title="Waiting" description="Description" />
      <Steps.Item title="Waiting" description="Description" />
    </Steps>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
