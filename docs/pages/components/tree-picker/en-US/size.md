### Size

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/en/city-simplified.json
 */

const styles = { width: 246, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <TreePicker
      size="lg"
      placeholder="Large"
      data={data}
      style={styles}
    />
    <TreePicker
      size="md"
      placeholder="Medium"
      data={data}
      style={styles}
    />
    <TreePicker
      size="sm"
      placeholder="Small"
      data={data}
      style={styles}
    />
    <TreePicker
      size="xs"
      placeholder="Xsmall"
      data={data}
      style={styles}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
