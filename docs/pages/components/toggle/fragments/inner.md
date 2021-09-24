<!--start-code-->

```js
const instance = (
  <div>
    <Toggle size="lg" checkedChildren="Open" unCheckedChildren="Close" />

    <Toggle checkedChildren={<CheckIcon />} unCheckedChildren={<CloseIcon />} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
