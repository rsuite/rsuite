<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <div>
    <TreePicker data={data} toggleAs={Button} />
    <hr />
    <TreePicker data={data} block toggleAs={Button} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
