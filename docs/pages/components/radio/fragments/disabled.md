<!--start-code-->

```js
const instance = (
  <div>
    <label>Disabled:</label>
    <Radio disabled> Radio</Radio>
    <Radio checked disabled>
      Checked Radio
    </Radio>

    <hr />
    <label>Read only:</label>
    <Radio readOnly> Radio</Radio>
    <Radio checked readOnly>
      Checked Radio
    </Radio>

    <hr />
    <label>Plaintext:</label>
    <Radio plaintext> Radio</Radio>
    <Radio checked plaintext>
      Checked Radio
    </Radio>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
