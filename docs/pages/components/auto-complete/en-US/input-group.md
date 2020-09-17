### Combined with InputGroup

<!--start-code-->

```js
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
        <Icon icon="search" />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Button>
        <Icon icon="search" />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <AutoComplete data={data} />
      <InputGroup.Addon>
        <Icon icon="search" />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>
        <Icon icon="avatar" />
      </InputGroup.Addon>
      <AutoComplete data={data} />
    </InputGroup>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
