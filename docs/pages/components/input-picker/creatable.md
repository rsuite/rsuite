### 可新建

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const instance = (
  <div>
    <InputPicker creatable data={data} style={{ width: 224 }} />
    <hr />
    <InputPicker creatable data={data} style={{ width: 224 }} groupBy="role" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
