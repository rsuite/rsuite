<!--start-code-->

```js
const instance = (
  <Steps current={1}>
    <Steps.Item title="Finished" icon={<PencilSquare style={{ fontSize: 20 }} />} />
    <Steps.Item title="In Progress" icon={<Book style={{ fontSize: 20 }} />} />
    <Steps.Item title="Waiting" icon={<Wechat style={{ fontSize: 20 }} />} />
    <Steps.Item title="Waiting" icon={<SteamSquare style={{ fontSize: 20 }} />} />
  </Steps>
);
ReactDOM.render(instance);
```

<!--end-code-->
