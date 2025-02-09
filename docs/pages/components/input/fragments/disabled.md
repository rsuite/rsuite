<!--start-code-->

```js
import { Input, InputGroup, VStack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <VStack style={{ width: 300 }}>
    <label>Disabled:</label>
    <Input disabled value="Disabled input" />
    <InputGroup disabled>
      <Input value="Disabled input group" />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <label>Read only:</label>
    <Input readOnly value="Read only input" />

    <label>Plaintext:</label>
    <Input plaintext value="Plaintext input" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
