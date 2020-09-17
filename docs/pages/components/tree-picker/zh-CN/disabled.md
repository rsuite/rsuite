### 禁用

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <div>
    <TreePicker data={data} disabled style={{ width: 246 }} />
    <hr />
    <p>禁用选项</p>
    <TreePicker defaultExpandAll data={data} disabledItemValues={[2]} style={{ width: 246 }}/>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
