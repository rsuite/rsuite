### 自动折叠

如果项目超过 5 个，会自动折叠。可以使用 `maxItems` 属性设置要显示的面包屑的最大数量。

<!--start-code-->

```js
const instance = (
  <Breadcrumb
    maxItems={5}
    onExpand={() => {
      console.log('call onExpand');
    }}
  >
    <Breadcrumb.Item>Item A</Breadcrumb.Item>
    <Breadcrumb.Item>Item B</Breadcrumb.Item>
    <Breadcrumb.Item>Item C</Breadcrumb.Item>
    <Breadcrumb.Item>Item D</Breadcrumb.Item>
    <Breadcrumb.Item>Item E</Breadcrumb.Item>
    <Breadcrumb.Item>Item F</Breadcrumb.Item>
  </Breadcrumb>
);
ReactDOM.render(instance);
```

<!--end-code-->
