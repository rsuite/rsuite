### 尺寸

<!--start-code-->

```js
const styles = { marginBottom: 10 };
const instance = (
  <div style={{ width: 160 }}>
    <InputNumber size="lg" style={styles} placeholder="lg" />
    <InputNumber size="md" style={styles} placeholder="md" />
    <InputNumber size="sm" style={styles} placeholder="sm" />
    <InputNumber size="xs" style={styles} placeholder="xs" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
