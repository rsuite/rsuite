<!--start-code-->

```js
const data = ['A', 'B', 'C', 'D'];

const App = () => {
  const [value, setValue] = React.useState(['A', 'C']);

  const handleCheckAll = (value, checked) => setValue(checked ? data : []);
  const handleChange = value => setValue(value);

  return (
    <div>
      <Checkbox
        indeterminate={value.length > 0 && value.length < data.length}
        checked={value.length === data.length}
        onChange={handleCheckAll}
      >
        Check all
      </Checkbox>
      <hr />
      <CheckboxGroup inline name="checkboxList" value={value} onChange={handleChange}>
        {data.map(item => (
          <Checkbox key={item} value={item}>
            Item {item}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
