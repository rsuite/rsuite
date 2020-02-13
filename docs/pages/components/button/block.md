
### 适应容器宽度

一般适用于流式布局，或者在某个容器的顶部、底部撑满整行。

设置一个 `block` 属性。

<!--start-code-->
```js
const instance = (
  <ButtonToolbar>
    <Button appearance='default' block>Block</Button>
    <Button appearance='primary' block>Block</Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```
<!--end-code-->