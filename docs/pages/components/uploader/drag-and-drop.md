### 拖拽上传

<!--start-code-->

```js
const styles = {
  lineHeight: '200px'
};

const App = () => {
  return (
    <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
      <div style={styles}>点击或拖拽文件到此区域上传</div>
    </Uploader>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
