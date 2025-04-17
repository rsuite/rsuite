<!--start-code-->

```js
import { NumberInput, InputGroup, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(0);
  const handleMinus = () => {
    setValue(parseInt(value, 10) - 1);
  };
  const handlePlus = () => {
    setValue(parseInt(value, 10) + 1);
  };

  return (
    <Stack direction="column" alignItems="flex-start" spacing={10} w={200}>
      <NumberInput prefix="$" />
      <NumberInput postfix="￥" />
      <NumberInput postfix="%" />
      <InputGroup>
        <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
        <NumberInput className={'custom-number-input'} value={value} onChange={setValue} />
        <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
      </InputGroup>
      <InputGroup>
        <NumberInput />
        <InputGroup.Addon>~</InputGroup.Addon>
        <NumberInput />
      </InputGroup>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
