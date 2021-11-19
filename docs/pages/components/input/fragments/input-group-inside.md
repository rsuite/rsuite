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
      <InputGroup.Addon>
        <Whisper placement="top" speaker={<Tooltip> Help information</Tooltip>}>
          <InfoIcon />
        </Whisper>
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Button>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>

    <InputGroup inside style={styles}>
      <Input />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>$</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>￥</InputGroup.Addon>
      <Input />
      <InputGroup.Addon>RMB</InputGroup.Addon>
    </InputGroup>

    <InputGroup inside style={styles}>
      <InputGroup.Addon>
        <AvatarIcon />
      </InputGroup.Addon>
      <Input />
    </InputGroup>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
