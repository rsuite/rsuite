<!--start-code-->

```js
const App = () => {
  const [value, setValue] = React.useState([]);
  const handleUpload = () => {
    uploaderRef.current.start();
  };
  const uploaderRef = React.useRef();
  return (
    <div>
      <Uploader
        value={value}
        autoUpload={false}
        action="//jsonplaceholder.typicode.com/posts/"
        onChange={setValue}
        ref={uploaderRef}
      />
      <hr />
      <Button disabled={!value.length} onClick={handleUpload}>
        Start Upload
      </Button>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
