<!--start-code-->

```js
import { Input, InputGroup, Whisper, Tooltip } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import { FaRegUserCircle } from 'react-icons/fa';

const styles = {
  width: 300,
  marginBottom: 10
};

const App = () => (
  <>
    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Addon>
        <Whisper placement="top" speaker={<Tooltip> Help information</Tooltip>}>
          <InfoRoundIcon />
        </Whisper>
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Button>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>https://</InputGroup.Addon>
      <Input defaultValue="www." />
    </InputGroup>

    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>$</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>￥</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>RMB</InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>
        <FaRegUserCircle />
      </InputGroup.Addon>
      <Input />
    </InputGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
