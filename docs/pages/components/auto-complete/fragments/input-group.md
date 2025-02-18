<!--start-code-->

```js
import { AutoComplete, InputGroup, VStack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MemberIcon from '@rsuite/icons/Member';

const data = [
  'Eugenia',
  'Bryan',
  'Linda',
  'Nancy',
  'Lloyd',
  'Alice',
  'Julia',
  'Albert',
  'Louisa',
  'Lester',
  'Lola',
  'Lydia',
  'Hal',
  'Hannah',
  'Harriet',
  'Hattie',
  'Hazel',
  'Hilda'
];

const App = () => (
  <VStack spacing={10} style={{ width: 300 }}>
    <InputGroup>
      <AutoComplete data={data} />
      <InputGroup.Button tabIndex={-1}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside>
      <AutoComplete data={data} />
      <InputGroup.Button tabIndex={-1}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside>
      <AutoComplete data={data} />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside>
      <InputGroup.Addon>
        <MemberIcon />
      </InputGroup.Addon>
      <AutoComplete data={data} />
    </InputGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
