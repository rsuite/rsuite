### 尺寸

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const styles = { width: 280, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <CheckTreePicker
      size="lg"
      placeholder="Large"
      data={data}
      style={styles}
    />
    <CheckTreePicker
      size="md"
      placeholder="Medium"
      data={data}
      style={styles}
    />
    <CheckTreePicker
      size="sm"
      placeholder="Small"
      data={data}
      style={styles}
    />
    <CheckTreePicker
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
