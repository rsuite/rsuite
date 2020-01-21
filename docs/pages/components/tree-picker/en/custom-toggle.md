### Use with the button

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/en/city-simplified.json
 */

const instance = (
  <div>
    <TreePicker
      data={data}
      toggleComponentClass={Button}
      style={{ width: 246 }}
    />
    <hr />
    <TreePicker
      data={data}
      block
      toggleComponentClass={Button}
      style={{ width: 246 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
