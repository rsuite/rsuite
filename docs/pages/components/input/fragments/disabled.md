<!--start-code-->

```js
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const styles = {
  width: 300,
  marginBottom: 10
};

const App = () => (
  <>
    <label>Disabled:</label>
    <Input disabled style={styles} value="A piece of text for demonstration." />
    <InputGroup disabled style={styles}>
      <Input value="A piece of text for demonstration." />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
    <hr />
    <label>Read only:</label>
    <Input readOnly style={styles} value="A piece of text for demonstration." />
    <hr />
    <label>Plaintext:</label>
    <Input plaintext style={styles} value="A piece of text for demonstration." />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
