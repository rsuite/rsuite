### Inside

<!--start-code-->

```js
const styles = {
  width: 300,
  marginBottom: 10
};

const instance = (
  <div>
    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Button>
        <Icon icon="search" />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Addon>
        <Icon icon="search" />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>$</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>
        <Icon icon="avatar" />
      </InputGroup.Addon>
      <Input />
    </InputGroup>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
