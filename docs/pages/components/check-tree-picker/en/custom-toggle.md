### Use with the button

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.ts
 */

const instance = (
  <div>
    <CheckTreePicker
      data={data}
      style={{ width: 280 }}
      toggleComponentClass={Button}
    />
    <hr />
    <CheckTreePicker
      data={data}
      block
      style={{ width: 280 }}
      toggleComponentClass={Button}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
