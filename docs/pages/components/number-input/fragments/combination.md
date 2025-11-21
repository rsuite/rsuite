<!--start-code-->

```js
import { NumberInput, InputGroup, VStack } from 'rsuite';
import { FaPlus, FaMinus } from 'react-icons/fa';

const App = () => {
  const [value, setValue] = React.useState(0);
  const handleMinus = () => {
    setValue(parseInt(value, 10) - 1);
  };
  const handlePlus = () => {
    setValue(parseInt(value, 10) + 1);
  };

  return (
    <VStack spacing={10} w={200}>
      <InputGroup inside>
        <InputGroup.Button onClick={handleMinus} appearance="default">
          <FaMinus size={10} />
        </InputGroup.Button>
        <NumberInput value={value} onChange={setValue} controls={false} />
        <InputGroup.Button onClick={handlePlus} appearance="default">
          <FaPlus size={10} />
        </InputGroup.Button>
      </InputGroup>
      <InputGroup inside>
        <NumberInput controls={false} />
        <InputGroup.Addon>~</InputGroup.Addon>
        <NumberInput controls={false} />
      </InputGroup>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
