### With Expand

Should automatically collapse if there are more than 5 items. Use `maxItems` to set the maximum number of breadcrumbs to display.

<!--start-code-->

```js
const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const instance = (
  <Breadcrumb
    maxItems={5}
    onExpand={() => {
      console.log('call onExpand');
    }}
  >
    <Breadcrumb.Item>Item -A</Breadcrumb.Item>
    {items.map(item => {
      return <Breadcrumb.Item>Item {item}</Breadcrumb.Item>;
    })}
  </Breadcrumb>
);
ReactDOM.render(instance);
```

<!--end-code-->
