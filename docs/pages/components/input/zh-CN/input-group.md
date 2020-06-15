### 输入框组合


<!--start-code-->
```js

const styles={
  width:300,
  marginBottom:10
}

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
     <InputNumber />
     <InputGroup.Addon>.00</InputGroup.Addon>
   </InputGroup>

    <InputGroup style={styles}>
      <Input />
      <InputGroup.Addon>to</InputGroup.Addon>
      <Input />
    </InputGroup>

    <InputGroup style={styles}>
      <Input />
      <InputGroup.Addon><Icon icon="search" /></InputGroup.Addon>
    </InputGroup>

    <InputGroup style={styles}>
      <InputGroup.Addon><Icon icon="avatar" /></InputGroup.Addon>
      <Input />
    </InputGroup>
  </div>
);

ReactDOM.render(instance);
```
<!--end-code-->