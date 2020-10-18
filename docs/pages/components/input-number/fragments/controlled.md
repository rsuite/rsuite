<!--start-code-->

```js
const App = () => {
  const [value, setValue] = React.useState(0.01);

  return (
    <div style={{ width: 160 }}>
      <InputNumber value={value} onChange={setValue} step={0.01} />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
