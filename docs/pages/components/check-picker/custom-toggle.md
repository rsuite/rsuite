### 和按钮组合

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const instance = (
  <div>
    <CheckPicker
      data={data}
      groupBy="role"
      placeholder="Select User"
      toggleComponentClass={Button}
    />
    <hr />
    <CheckPicker
      data={data}
      groupBy="role"
      block
      placeholder="Select User"
      toggleComponentClass={Button}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
