<!--start-code-->

```js
const instance = (
  <div>
    <Toggle size="lg" checkedChildren="Open" unCheckedChildren="Close" />

    <Toggle checkedChildren={<Icon icon="check" />} unCheckedChildren={<Icon icon="close" />} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
