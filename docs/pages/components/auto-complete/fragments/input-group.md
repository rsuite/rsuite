<!--start-code-->

```js
/**
 * import { AutoComplete, InputGroup } from 'rsuite';
 * import SearchIcon from '@rsuite/icons/Search';
 * import MemberIcon from '@rsuite/icons/Member';
 */

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

const instance = (
  <div>
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
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
