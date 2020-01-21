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

If you need to set a column to automatic width, you need to configure the `flexGrow` property. `flexGrow` is a `number` type. Will fill the `Table` remaining width according to the sum of all `flexGrow`.

> Note: After setting `flexGrow`, you cannot set the `width` and `resizable` properties. You can set a minimum width by `minwidth`.

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
