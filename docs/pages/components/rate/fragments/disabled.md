<!--start-code-->

```js
import { Rate, HStack, Text } from 'rsuite';

const App = () => (
  <>
    <HStack spacing={10}>
      <label>Disabled: </label>
      <Rate disabled defaultValue={2.5} allowHalf />
    </HStack>

    <hr />
    <HStack spacing={10}>
      <label>Readonly: </label>
      <Rate readOnly defaultValue={2.5} allowHalf />
    </HStack>

    <hr />
    <HStack spacing={10}>
      <label>Plaintext: </label>
      <Rate plaintext defaultValue={2.5} allowHalf />
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
