<!--start-code-->

```js
const styles = {
  width: 300,
  marginBottom: 10
};

const instance = (
  <div>
    <InputGroup style={styles}>
      <Input />
      <InputGroup.Button>
        <Search />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Button>
        <Search />
      </InputGroup.Button>
    </InputGroup>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
