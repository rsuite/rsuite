### Indeterminate State

the `indeterminate` property is mainly used on the select all or tree structure checkbox.

<!--start-code-->

```js
const options = ['A', 'B', 'C', 'D'];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indeterminate: true,
      checkAll: false,
      value: ['A', 'C']
    };
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCheckAll(value, checked) {
    const nextValue = checked ? options : [];
    console.log(nextValue, 'handleCheckAll');
    this.setState({
      value: nextValue,
      indeterminate: false,
      checkAll: checked
    });
  }
  handleChange(value) {
    console.log(value, 'handleChange');
    this.setState({
      value,
      indeterminate: value.length > 0 && value.length < options.length,
      checkAll: value.length === options.length
    });
  }
  render() {
    return (
      <div>
        <Checkbox
          indeterminate={this.state.indeterminate}
          checked={this.state.checkAll}
          onChange={this.handleCheckAll}
        >
          Check all
        </Checkbox>
        <hr />
        <CheckboxGroup
          inline
          name="checkboxList"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Checkbox value="A">Item A</Checkbox>
          <Checkbox value="B">Item B</Checkbox>
          <Checkbox value="C">Item C</Checkbox>
          <Checkbox value="D">Item D</Checkbox>
        </CheckboxGroup>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
