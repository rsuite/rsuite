### Full

<!--start-code-->

```js
const styles = {
  background: '#000',
  padding: 20,
  position: 'relative'
};

const instance = (
  <div style={styles}>
    <Message full showIcon type="warning" description="Warning" />
    <Paragraph rows={10} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
