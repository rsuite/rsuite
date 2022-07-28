<!--start-code-->

```js
import { InputNumber, InputGroup } from 'rsuite';

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
      <hr />
      <InputGroup>
        <InputNumber />
        <InputGroup.Addon>~</InputGroup.Addon>
        <InputNumber />
      </InputGroup>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
