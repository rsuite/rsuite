<!--start-code-->

```js
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';

const App = () => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  return (
    <InputGroup inside w={300}>
      <Input value={searchKeyword} onChange={setSearchKeyword} />
      {searchKeyword ? (
        <InputGroup.Button onClick={() => setSearchKeyword('')}>
          <CloseOutlineIcon />
        </InputGroup.Button>
      ) : (
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      )}
    </InputGroup>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
