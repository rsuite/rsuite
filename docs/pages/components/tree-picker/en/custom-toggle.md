### Use with the button

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.ts
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
