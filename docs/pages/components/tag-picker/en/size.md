### Size

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

const styles = { width: 300, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <TagPicker
      toggleComponentClass={Button}
      size="lg"
      placeholder="Large"
      data={data}
      style={styles}
    />
    <TagPicker
      toggleComponentClass={Button}
      size="md"
      placeholder="Medium"
      data={data}
      style={styles}
    />
    <TagPicker
      toggleComponentClass={Button}
      size="sm"
      placeholder="Small"
      data={data}
      style={styles}
    />
    <TagPicker
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
