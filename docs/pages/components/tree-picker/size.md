### 尺寸

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/city-simplified.ts
 */

const styles = { width: 246, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <TreePicker
      toggleComponentClass={Button}
      size="lg"
      placeholder="Large"
      data={data}
      style={styles}
    />
    <TreePicker
      toggleComponentClass={Button}
      size="md"
      placeholder="Medium"
      data={data}
      style={styles}
    />
    <TreePicker
      toggleComponentClass={Button}
      size="sm"
      placeholder="Small"
      data={data}
      style={styles}
    />
    <TreePicker
      toggleComponentClass={Button}
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
