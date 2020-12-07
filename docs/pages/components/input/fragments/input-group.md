<!--start-code-->

```js
const styles = {
  width: 300,
  marginBottom: 10
};

const instance = (
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
        <Search />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup style={styles}>
      <InputGroup.Addon>
        <Avatar />
      </InputGroup.Addon>
      <Input />
    </InputGroup>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
