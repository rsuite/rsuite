### 文字和图标

可以通过 `checkedChildren`,`unCheckedChildren` 两个属性分别设置开关两种状态下显示的内容

<!--start-code-->
```js
const instance = (
  <div>
    <Toggle
      size='lg'
      checkedChildren="打开"
      unCheckedChildren="关闭"
    />

    <Toggle
      checkedChildren={<Icon icon="check"/>}
      unCheckedChildren={<Icon icon="close"/>}
    />
  </div>
);
ReactDOM.render(instance);
```
<!--end-code-->