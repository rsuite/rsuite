<!--start-code-->

```js
import SearchIcon from '@rsuite/icons/Search';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import { Input, InputGroup, Whisper, Tooltip, VStack, Kbd } from 'rsuite';
import { FaRegUserCircle } from 'react-icons/fa';

const App = () => (
  <VStack w={300}>
    <InputGroup inside>
      <Input />
      <InputGroup.Button>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside>
      <Input />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside>
      <InputGroup.Addon>$</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>

    <InputGroup inside>
      <InputGroup.Addon>￥</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>RMB</InputGroup.Addon>
    </InputGroup>

    <InputGroup inside>
      <InputGroup.Addon>
        <FaRegUserCircle />
      </InputGroup.Addon>
      <Input />
    </InputGroup>

    <InputGroup inside>
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
      <Input placeholder="Search" autoComplete="off" />
      <InputGroup.Addon>
        <Kbd size="sm">⌘ K</Kbd>
      </InputGroup.Addon>
    </InputGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
