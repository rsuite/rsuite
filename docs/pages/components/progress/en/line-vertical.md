### Vertical

<!--start-code-->

```js
const { Line } = Progress;
const instance = (
  <div className="line-vertical-wrapper" style={{ height: 500 }}>
    <Line vertical />
    <Line vertical percent={30} strokeColor="#ffc107" />
    <Line vertical percent={30} status="active" />
    <Line vertical percent={50} status="fail" />
    <Line vertical percent={100} status="success" />
    <Line vertical percent={80} showInfo={false} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
