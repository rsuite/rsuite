### 外观

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
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
