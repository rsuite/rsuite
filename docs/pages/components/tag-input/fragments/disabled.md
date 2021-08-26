<!--start-code-->

```js
const instance = (
  <div>
    <label>Disabled: </label>
    <TagInput
      disabled
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />

    <hr />
    <label>Read only: </label>
    <TagInput
      readOnly
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
    <hr />
    <label>Plaintext: </label>
    <TagInput
      plaintext
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
