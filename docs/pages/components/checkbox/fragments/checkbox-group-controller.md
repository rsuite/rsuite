<!--start-code-->

```js
const App = () => {
  const [value, setValue] = React.useState(['A', 'C']);
  return (
    <CheckboxGroup
      inline
      name="checkboxList"
      value={value}
      onChange={value => {
        console.log(value, 'onChange');
        setValue(value);
      }}
    >
      <Checkbox value="A">Item A</Checkbox>
      <Checkbox value="B">Item B</Checkbox>
      <Checkbox value="C">Item C</Checkbox>
      <Checkbox value="D" disabled>
        Item D
      </Checkbox>
    </CheckboxGroup>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
