<!--start-code-->

```js
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { FaRegUserCircle } from 'react-icons/fa';

const styles = {
  width: 300,
  marginBottom: 10
};

const App = () => (
  <div>
    <InputGroup style={styles}>
      <InputGroup.Addon> @</InputGroup.Addon>
      <Input />
    </InputGroup>

    <InputGroup style={styles}>
      <Input />
      <InputGroup.Addon>.com</InputGroup.Addon>
    </InputGroup>

    <InputGroup style={styles}>
      <InputGroup.Addon>$</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>

    <InputGroup style={styles}>
      <Input />
      <InputGroup.Addon>to</InputGroup.Addon>
      <Input />
    </InputGroup>

    <InputGroup style={styles}>
      <Input />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup style={styles}>
      <InputGroup.Addon>
        <FaRegUserCircle />
      </InputGroup.Addon>
      <Input />
    </InputGroup>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
