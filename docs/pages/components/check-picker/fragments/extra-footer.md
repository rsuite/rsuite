<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const footerStyles = {
  padding: '10px 2px',
  borderTop: '1px solid #e5e5e5'
};

const footerButtonStyle = {
  float: 'right',
  marginRight: 10,
  marginTop: 2
};

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
        style={{ width: 224 }}
        value={value}
        onChange={handleChange}
        renderExtraFooter={() => (
          <div style={footerStyles}>
            <Checkbox
              inline
              indeterminate={value.length > 0 && value.length < allValue.length}
              checked={value.length === allValue.length}
              onChange={handleCheckAll}
            >
              Check all
            </Checkbox>

            <Button
              style={footerButtonStyle}
              appearance="primary"
              size="sm"
              onClick={() => {
                picker.current.close();
              }}
            >
              Ok
            </Button>
          </div>
        )}
      />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
