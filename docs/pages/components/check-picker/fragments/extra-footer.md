<!--start-code-->

```js
import { CheckPicker, Checkbox, Button, HStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const allValue = data.map(item => item.value);

const App = () => {
  const picker = React.useRef();
  const [value, setValue] = React.useState([]);

  const handleChange = value => {
    setValue(value);
  };

  const handleCheckAll = (value, checked) => {
    setValue(checked ? allValue : []);
  };

  return (
    <div className="example-item">
      <CheckPicker
        data={data}
        placeholder="Select"
        ref={picker}
        w={224}
        value={value}
        onChange={handleChange}
        renderExtraFooter={() => (
          <HStack
            justifyContent="space-between"
            style={{
              padding: '4px 12px'
            }}
          >
            <Checkbox
              indeterminate={value.length > 0 && value.length < allValue.length}
              checked={value.length === allValue.length}
              onChange={handleCheckAll}
            >
              Check all
            </Checkbox>

            <Button
              appearance="primary"
              size="sm"
              onClick={() => {
                picker.current.close();
              }}
            >
              Ok
            </Button>
          </HStack>
        )}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
