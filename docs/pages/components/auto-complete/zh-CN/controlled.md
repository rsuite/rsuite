### 受控

<!--start-code-->

```js
const data = [
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP 中文',
  'HYPER Ad Serving',
  'HYPER Data Discovery'
];

class ControlledAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({
      value
    });
  }
  render() {
    const { value } = this.state;
    return <AutoComplete data={data} value={value} onChange={this.handleChange} />;
  }
}
ReactDOM.render(<ControlledAutoComplete />);
```

<!--end-code-->
