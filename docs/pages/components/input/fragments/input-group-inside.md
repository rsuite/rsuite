<!--start-code-->

```js
import SearchIcon from '@rsuite/icons/Search';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import { Input, InputGroup, Whisper, Tooltip, VStack } from 'rsuite';
import { FaRegUserCircle } from 'react-icons/fa';

const App = () => (
  <VStack style={{ width: 300 }}>
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
        <Kbd>⌘ K</Kbd>
      </InputGroup.Addon>
    </InputGroup>
  </VStack>
);

const Kbd = ({ children }) => (
  <kbd
    style={{
      fontSize: '0.875rem',
      backgroundColor: 'var(--rs-bg-well)',
      border: 'solid #c8c8c8',
      borderImage: 'initial',
      borderRadius: '.25em',
      borderWidth: '1px 1px 2px',
      boxSizing: 'border-box',
      color: '#343434',
      color: 'var(--rs-text-primary)',
      fontSize: '.875em',
      padding: '0 .3em',
      lineHeight: '1.36'
    }}
  >
    {children}
  </kbd>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
