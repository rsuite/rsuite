### Size

<!--start-code-->

```js
const styles = { width: 280, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <DatePicker
      size="lg"
      placeholder="Large"
      style={styles}
    />
    <DatePicker
      size="md"
      placeholder="Medium"
      style={styles}
    />
    <DatePicker
      size="sm"
      placeholder="Small"
      style={styles}
    />
    <DatePicker
      size="xs"
      placeholder="Xsmall"
      style={styles}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
