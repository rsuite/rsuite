### 不可见的

<!--start-code-->

```js
const App = () => {
  const [content, setContent] = React.useState(true);
  return (
    <div>
      <Badge content={content}>
        <Button>新消息</Button>
      </Badge>
      <hr />
      <Toggle checked={content} onChange={setContent} />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
