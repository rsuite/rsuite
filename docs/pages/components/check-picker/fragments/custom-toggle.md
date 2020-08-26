### Use with the button

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <div>
    <CheckPicker data={data} groupBy="role" placeholder="Select User" toggleAs={Button} />
    <hr />
    <CheckPicker data={data} groupBy="role" block placeholder="Select User" toggleAs={Button} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
