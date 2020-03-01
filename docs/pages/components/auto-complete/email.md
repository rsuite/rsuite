### 自动补全

<!--start-code-->

```js
const data = ['@gmail.com', '@sina.com.cn', '@163.com', '@qq.com'];

class CustomizedAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    const at = value.match(/@[\S]*/);
    const nextData = at
      ? data.filter(item => item.indexOf(at[0]) >= 0).map(item => {
          return `${value}${item.replace(at[0], '')}`;
        })
      : data.map(item => `${value}${item}`);

    this.setState({
      data: nextData
    });
  }
  render() {
    return <AutoComplete data={this.state.data} placeholder="Email" onChange={this.handleChange} />;
  }
}
ReactDOM.render(<CustomizedAutoComplete />);
```

<!--end-code-->
