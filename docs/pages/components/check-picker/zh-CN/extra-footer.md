### 自定义页脚

自定义一个全选功能

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

class ExtraFooterExample extends React.Component {
  constructor() {
    super();
    this.state = {
      indeterminate: false,
      checkAll: false,
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
  }
  handleChange(value) {
    this.setState({
      value,
      indeterminate: value.length > 0 && value.length < allValue.length,
      checkAll: value.length === allValue.length
    });
  }

  handleCheckAll(value, checked) {
    const nextValue = checked ? allValue : [];
    this.setState({
      value: nextValue,
      indeterminate: false,
      checkAll: checked
    });
  }
  render() {
    const { checkAll, indeterminate } = this.state;
    return (
      <div className="example-item">
        <CheckPicker
          data={data}
          placeholder="请选择"
          ref={ref => {
            this.picker = ref;
          }}
          style={{ width: 224 }}
          value={this.state.value}
          onChange={this.handleChange}
          renderExtraFooter={() => (
            <div style={footerStyles}>
              <Checkbox
                inline
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={this.handleCheckAll}
              >
                全选
              </Checkbox>

              <Button
                style={footerButtonStyle}
                appearance="primary"
                size="sm"
                onClick={() => {
                  this.picker.close();
                }}
              >
                确定
              </Button>
            </div>
          )}
        />
      </div>
    );
  }
}

ReactDOM.render(<ExtraFooterExample />);
```

<!--end-code-->
