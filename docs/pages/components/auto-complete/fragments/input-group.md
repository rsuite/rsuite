<!--start-code-->

```js
const styles = {
  width: 300,
  marginBottom: 10,
};

const data = [
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP',
  'HYPER Ad Serving',
  'HYPER Data Discovery',
];

const instance = (
  <div>
    <InputGroup style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Button>
        <Search />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Button>
        <Search />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Addon>
        <Search />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>
        <Avatar />
      </InputGroup.Addon>
      <AutoComplete data={data} />
    </InputGroup>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
