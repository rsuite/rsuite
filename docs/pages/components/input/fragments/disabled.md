<!--start-code-->

```js
const styles = {
  width: 300,
  marginBottom: 10
};

const instance = (
  <div>
    <label>Disabled:</label>
    <Input disabled style={styles} value="A piece of text for demonstration." />
    <InputGroup disabled style={styles}>
      <Input value="A piece of text for demonstration." />
      <InputGroup.Addon>
        <Search />
      </InputGroup.Addon>
    </InputGroup>
    <hr />
    <label>Read only:</label>
    <Input readOnly style={styles} value="A piece of text for demonstration." />
    <hr />
    <label>Plaintext:</label>
    <Input plaintext style={styles} value="A piece of text for demonstration." />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
