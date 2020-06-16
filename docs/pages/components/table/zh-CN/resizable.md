<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */


class ResizableColumnTable extends React.Component {
  constructor(props) {
    super(props);
    const data = fakeData.filter((v, i) => i < 8);
    this.state = {
      data
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Table height={420} data={data}>
          <Column width={50} align="center" resizable>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={100} resizable>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={100} resizable>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column width={200} resizable>
            <HeaderCell>City</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={200} resizable>
            <HeaderCell>Company Name</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<ResizableColumnTable />);
```

<!--end-code-->

把鼠标移动到列分割线的时候，会显示出一个蓝色的移动手柄，点击不松开并左右拖动就可以调整列的宽度。

要支持该功能，需要在 `Column` 设置一个 `resizable` 属性。