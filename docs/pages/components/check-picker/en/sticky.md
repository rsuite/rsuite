### Sticky

Set the `sticky` property to put the selected in the options to the top.

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
