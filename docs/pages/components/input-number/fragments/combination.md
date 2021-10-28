<!--start-code-->

```js
const App = () => {
  const [value, setValue] = React.useState(0);
  const handleMinus = () => {
    setValue(parseInt(value, 10) - 1);
  };
  const handlePlus = () => {
    setValue(parseInt(value, 10) + 1);
  };
  return (
    <div style={{ width: 160 }}>
      <InputNumber prefix="$" />
      <hr />
      <InputNumber postfix="￥" />
      <hr />
      <InputNumber postfix="%" />
      <hr />
      <InputGroup>
        <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
        <InputNumber className={'custom-input-number'} value={value} onChange={setValue} />
        <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
      </InputGroup>
    </div>
  );
};
ReactDOM.render(<App />);

/**
.custom-input-number {
  input {
    text-align: center;
  }

  .rs-input-number-btn-group-vertical {
    display: none;
  }
}
**/
```

<!--end-code-->
