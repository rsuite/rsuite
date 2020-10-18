<!--start-code-->

```js
const instance = (
  <div>
    <Progress.Line />
    <Progress.Line percent={30} strokeColor="#ffc107" />
    <Progress.Line percent={30} status="active" />
    <Progress.Line percent={50} status="fail" />
    <Progress.Line percent={100} status="success" />
    <Progress.Line percent={80} showInfo={false} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
