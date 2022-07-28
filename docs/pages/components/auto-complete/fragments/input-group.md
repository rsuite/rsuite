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
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP',
  'HYPER Ad Serving',
  'HYPER Data Discovery'
];

const App = () => (
  <>
    <InputGroup style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Button>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Button>
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
