<!--start-code-->

```js
const instance = (
  <div>
    <Toggle size="lg" checkedChildren="Open" unCheckedChildren="Close" />

    <Toggle checkedChildren={<Check />} unCheckedChildren={<Close />} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
