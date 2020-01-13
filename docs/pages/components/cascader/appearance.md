### 外观

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/province-simplified.js
 */

const instance = (
  <div>
    <Cascader
      data={data}
      appearance="default"
      placeholder="Default"
      style={{ width: 224 }}
    />
    <hr />
    <Cascader
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
