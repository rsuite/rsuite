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
        {visible ? <Eye /> : <EyeSlash />}
      </InputGroup.Button>
    </InputGroup>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
