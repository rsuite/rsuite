### Drag and drop

<!--start-code-->

```js
const styles = {
  lineHeight: '200px'
};

const App = () => {
  return (
    <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
      <div style={styles}>Click or Drag files to this area to upload</div>
    </Uploader>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
