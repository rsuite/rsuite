### 受控的 Radio 组

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioList: 'A'
    };
  }
  handleChange(name, value) {
    this.setState({
      [name]: value
    });
    console.log(name, value);
  }
  render() {
    return (
      <RadioGroup
        inline
        name="radioList"
        value={this.state.radioList}
        onChange={value => {
          this.handleChange('radioList', value);
        }}
      >
        <Radio value="A">Item A</Radio>
        <Radio value="B">Item B</Radio>
        <Radio value="C">Item C</Radio>
        <Radio value="D" disabled>
          Item D
        </Radio>
      </RadioGroup>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
