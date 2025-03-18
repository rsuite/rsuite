<!--start-code-->

```js
import { Input, InputGroup, VStack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <VStack w={300}>
    <InputGroup>
      <Input />
      <InputGroup.Button>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside>
      <Input />
      <InputGroup.Button>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
