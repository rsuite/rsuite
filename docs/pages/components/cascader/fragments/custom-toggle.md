### Use with the button

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <div>
    <Cascader data={data} toggleAs={Button} />
    <hr />
    <Cascader data={data} block toggleAs={Button} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
