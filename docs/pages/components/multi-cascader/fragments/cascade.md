<!--start-code-->

```js
const App = () => {
  const [cascade, setCascade] = React.useState(true);
  const [value, setValue] = React.useState([]);

  const handleToggle = checked => {
    setCascade(checked);
    setValue([]);
  };

  return (
    <div>
      Cascade: <Toggle checked={cascade} onChange={handleToggle} />
      <hr />
      <MultiCascader
        style={{ width: 280 }}
        data={data}
        value={value}
        cascade={cascade}
        onChange={setValue}
      />
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
