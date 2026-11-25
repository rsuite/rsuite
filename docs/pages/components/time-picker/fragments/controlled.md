<!--start-code-->

```js
import { TimePicker, HStack, VStack, Text, Divider, Button } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (value, event) => {
    setValue(value);
    console.log('Controlled Change', value);
  };

  return (
    <VStack divider={<Divider />}>
      <HStack>
        <Text muted w={140}>
          Controlled Value:
        </Text>
        <TimePicker value={value} onChange={handleChange} />
        <Button onClick={() => setValue(null)}>Reset</Button>
      </HStack>

      <HStack>
        <Text muted w={140}>
          Uncontrolled Value:
        </Text>
        <TimePicker defaultValue={new Date()} />
      </HStack>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
