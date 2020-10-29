<!--start-code-->

```js
const styles = {
  width: 300
};

const App = () => {
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <InputGroup inside style={styles}>
      <Input type={visible ? 'text' : 'password'} />
      <InputGroup.Button onClick={handleChange}>
        <Icon icon={visible ? 'eye' : 'eye-slash'} />
      </InputGroup.Button>
    </InputGroup>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
