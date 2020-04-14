### 尺寸

<!--start-code-->

```js
const styles = { width: 280, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <DatePicker
      toggleComponentClass={Button}
      size="lg"
      placeholder="Large"
      style={styles}
    />
    <DatePicker
      toggleComponentClass={Button}
      size="md"
      placeholder="Medium"
      style={styles}
    />
    <DatePicker
      toggleComponentClass={Button}
      size="sm"
      placeholder="Small"
      style={styles}
    />
    <DatePicker
      toggleComponentClass={Button}
      size="xs"
      placeholder="Xsmall"
      style={styles}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
