<!--start-code-->

```js
import { Checkbox, CheckboxGroup } from 'rsuite';

const data = ['A', 'B'];

const App = () => {
  const [value, setValue] = React.useState(['A']);

  const handleCheckAll = (value, checked) => setValue(checked ? data : []);
  const handleChange = value => setValue(value);

  return (
    <>
      <Checkbox
        indeterminate={value.length > 0 && value.length < data.length}
        checked={value.length === data.length}
        onChange={handleCheckAll}
      >
        Parent Checkbox
      </Checkbox>

      <CheckboxGroup
        name="checkboxList"
        value={value}
        onChange={handleChange}
        style={{ marginLeft: 36 }}
      >
        {data.map(item => (
          <Checkbox key={item} value={item}>
            Child Checkbox {item}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
