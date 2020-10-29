<!--start-code-->

```js
const instance = (
  <div style={{ width: 160 }}>
    <label>Disabled:</label>
    <InputNumber disabled defaultValue={10} />
    <hr />
    <label>Read only:</label>
    <InputNumber readOnly defaultValue={10} />

    <hr />
    <label>Plaintext</label>
    <InputNumber plaintext defaultValue={10} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
