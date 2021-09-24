<!--start-code-->

```js
const styles = { width: 300, display: 'block', marginBottom: 10 };
const instance = (
  <div>
    <TagInput size="lg" placeholder="Large" style={styles} />
    <TagInput size="md" placeholder="Medium" style={styles} />
    <TagInput size="sm" placeholder="Small" style={styles} />
    <TagInput size="xs" placeholder="Xsmall" style={styles} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
