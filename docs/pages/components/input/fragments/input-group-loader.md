<!--start-code-->

```js
import { Input, InputGroup, Loader, VStack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <VStack w={300}>
    <InputGroup>
      <Input />
      <InputGroup.Addon>
        <Loader />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside>
      <Input />
      <InputGroup.Addon>
        <Loader />
      </InputGroup.Addon>
    </InputGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
