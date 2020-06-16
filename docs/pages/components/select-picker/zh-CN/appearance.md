### 外观

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <SelectPicker
      data={data}
      appearance="default"
      placeholder="Default"
      style={{ width: 224 }}
    />
    <hr />
    <SelectPicker
      data={data}
      appearance="subtle"
      placeholder="Subtle"
      style={{ width: 224 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
