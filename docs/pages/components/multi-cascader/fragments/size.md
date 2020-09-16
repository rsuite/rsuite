<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const styles = { width: 224, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <MultiCascader toggleAs={Button} size="lg" placeholder="Large" data={data} style={styles} />
    <MultiCascader toggleAs={Button} size="md" placeholder="Medium" data={data} style={styles} />
    <MultiCascader toggleAs={Button} size="sm" placeholder="Small" data={data} style={styles} />
    <MultiCascader toggleAs={Button} size="xs" placeholder="Xsmall" data={data} style={styles} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
