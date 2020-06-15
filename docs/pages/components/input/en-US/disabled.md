### Disabled

<!--start-code-->

```js
const styles = {
  width: 300,
  marginBottom: 10
};

const instance = (
  <div>
    <Input style={styles} disabled />
    <InputGroup style={styles} disabled>
      <Input />
      <InputGroup.Addon>
        <Icon icon="search" />
      </InputGroup.Addon>
    </InputGroup>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
