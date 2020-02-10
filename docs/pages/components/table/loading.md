<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */


class LoadingTable extends React.Component {
  constructor(props) {
    super(props);
    const data = fakeData.filter((v, i) => i < 8);
    this.state = {
      data,
      loading: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(loading){
    this.setState({ loading });
  }
  render() {
    const {loading} = this.state;
    return (
      <div>
        <Table loading={loading} height={400} data={this.state.data}>
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={130} fixed>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={130}>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column width={200}>
            <HeaderCell>City</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={200}>
            <HeaderCell>Street</HeaderCell>
            <Cell dataKey="street" />
          </Column>

          <Column width={200}>
            <HeaderCell>Company Name</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>

          <Column width={200}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={200}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={200}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={200}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
        </Table>
        <hr/>
        <div>
          加载状态：<Toggle
            checkedChildren="开启"
            unCheckedChildren="关闭"
            checked={loading}
            onChange={this.handleToggle}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<LoadingTable />);
```

<!--end-code-->

当数据在异步获取中，需要在显示一个 `loading` 状态, 只需要在 `<Table>` 上设置 `loading` 属性就行
