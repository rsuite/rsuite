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
