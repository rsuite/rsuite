### 置顶已选项

设置 `sticky`属性， 把选项中已选择的选项置顶在最前面。

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

const instance = (
  <div>
    <CheckPicker
      sticky
      data={data}
      defaultValue={['Kenya', 'Julius']}
      style={{ width: 224 }}
    />
    <hr />
    <CheckPicker
      sticky
      data={data}
      groupBy="role"
      defaultValue={['Kenya', 'Julius']}
      style={{ width: 224 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
