### 旋转和翻转

<!--start-code-->
```js
const instance = (
  <div className='icon-example-list'>
    <Icon icon='shield' rotate={90} />
    <Icon icon='shield' rotate={180} />
    <Icon icon='shield' rotate={270} />
    <Icon icon='shield' flip="horizontal" />
    <Icon icon='shield' flip="vertical" />
  </div>
);
ReactDOM.render(instance);
```
<!--end-code-->
