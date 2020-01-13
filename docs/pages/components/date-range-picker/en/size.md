### Size

<!--start-code-->

```js
const styles = { width: 260, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <DateRangePicker
      toggleComponentClass={Button}
      size="lg"
      placeholder="Large"
      style={styles}
    />
    <DateRangePicker
      toggleComponentClass={Button}
      size="md"
      placeholder="Medium"
      style={styles}
    />
    <DateRangePicker
      toggleComponentClass={Button}
      size="sm"
      placeholder="Small"
      style={styles}
    />
    <DateRangePicker
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
