### 尺寸

<!--start-code-->

```js
const styles = { width: 260, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <DateRangePicker
      size="lg"
      placeholder="Large"
      style={styles}
    />
    <DateRangePicker
      size="md"
      placeholder="Medium"
      style={styles}
    />
    <DateRangePicker
      size="sm"
      placeholder="Small"
      style={styles}
    />
    <DateRangePicker
      size="xs"
      placeholder="Xsmall"
      style={styles}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
