<!--start-code-->

```js
import { AutoComplete, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MemberIcon from '@rsuite/icons/Member';

const styles = {
  width: 300,
  marginBottom: 10
};

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
  <>
    <InputGroup style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Button tabIndex={-1}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Button tabIndex={-1}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>
        <MemberIcon />
      </InputGroup.Addon>
      <AutoComplete data={data} />
    </InputGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
