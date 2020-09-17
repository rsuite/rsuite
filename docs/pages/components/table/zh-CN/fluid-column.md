<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */


class FluidColumnTable extends React.Component {
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
        <Table
          height={420}
          data={data}
          onSortColumn={(sortColumn, sortType) => {
            console.log(sortColumn, sortType);
          }}
        >
          <Column width={50} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={100} fixed>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>
              City <code>flexGrow={1}</code>
            </HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column flexGrow={2}>
            <HeaderCell>
              Company Name <code>flexGrow={2}</code>
            </HeaderCell>
            <Cell dataKey="companyName" />
          </Column>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<FluidColumnTable />);
```

<!--end-code-->

如果需要把某列设置为自动宽度，需要配置 `flexGrow` 属性。 `flexGrow` 是 `number` 类型。会按照所有 `flexGrow` 总和比例撑满 `<Table>` 剩下的宽度。

> 注意: 设置 `flexGrow` 以后，就不能设置 `width` 和 `resizable` 属性。 可以通过 `minWidth` 设置一个最小宽度

```html
<Column flexGrow={1}>
  <HeaderCell>City <code>flexGrow={1}</code></HeaderCell>
  <Cell dataKey="city" />
</Column>

<Column flexGrow={2}>
  <HeaderCell>Company Name <code>flexGrow={2}</code></HeaderCell>
  <Cell dataKey="companyName" />
</Column>

...
```
