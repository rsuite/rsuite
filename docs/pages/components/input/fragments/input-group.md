<!--start-code-->

```js
import SearchIcon from '@rsuite/icons/Search';
import { Input, InputGroup, VStack } from 'rsuite';
import { FaRegUserCircle } from 'react-icons/fa';

const App = () => (
  <VStack w={300}>
    <InputGroup>
      <InputGroup.Addon> @</InputGroup.Addon>
      <Input />
    </InputGroup>

    <InputGroup>
      <Input />
      <InputGroup.Addon>.com</InputGroup.Addon>
    </InputGroup>

    <InputGroup>
      <InputGroup.Addon>$</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>

    <InputGroup>
      <Input />
      <InputGroup.Addon>to</InputGroup.Addon>
      <Input />
    </InputGroup>

    <InputGroup>
      <Input />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup>
      <InputGroup.Addon>
        <FaRegUserCircle />
      </InputGroup.Addon>
      <Input />
    </InputGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
