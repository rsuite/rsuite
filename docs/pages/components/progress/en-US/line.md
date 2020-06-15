
### Line

<!--start-code-->
```js
const { Line } = Progress;
const instance = (
  <div>
    <Line />
    <Line percent={30} strokeColor="#ffc107" />
    <Line percent={30} status='active' />
    <Line percent={50} status='fail' />
    <Line percent={100} status='success' />
    <Line percent={80} showInfo={false} />

  </div>
)

ReactDOM.render(instance);

```
<!--end-code-->
