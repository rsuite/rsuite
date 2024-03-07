<!--start-code-->

```js
import { InputNumber, InputGroup, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(0);
  const handleMinus = () => {
    setValue(parseInt(value, 10) - 1);
  };
  const handlePlus = () => {
    setValue(parseInt(value, 10) + 1);
  };

  return (
    <Stack direction="column" alignItems="flex-start" spacing={10}>
      <InputNumber prefix="$" />
      <InputNumber postfix="￥" />
      <InputNumber postfix="%" />
      <InputGroup>
        <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
        <InputNumber className={'custom-input-number'} value={value} onChange={setValue} />
        <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
      </InputGroup>
      <InputGroup>
        <InputNumber />
        <InputGroup.Addon>~</InputGroup.Addon>
        <InputNumber />
      </InputGroup>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
