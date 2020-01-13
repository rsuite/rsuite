### Use with the button

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
      groupBy="role"
      placeholder="Select User"
      toggleComponentClass={Button}
    />
    <hr />
    <SelectPicker
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
