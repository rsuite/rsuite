<!--start-code-->

```js
import { DateRangeInput, VStack, HStack, Text, Divider, Button } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([new Date('2023-10-01'), new Date('2023-10-31')]);

  const handleChange = (value, event) => {
    setValue(value);
    console.log('Controlled Change', value);
  };

  return (
    <VStack spacing={10} divider={<Divider />} >
      <HStack>
        <Text muted w={140}>
          Controlled Value
        </Text>
        <DateRangeInput value={value} onChange={handleChange} w={260}/>

        <Button onClick={() => setValue(null)}>Clear</Button>
      </HStack>

      <HStack>
        <Text muted w={140}>
          Uncontrolled Value
        </Text>
        <DateRangeInput defaultValue={value} w={260}/>
      </HStack>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
