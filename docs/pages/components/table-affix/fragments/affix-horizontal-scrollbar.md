<!--start-code-->

```js
import { Table } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(100);

const App = () => {
  return (
    <Table
      height={420}
      data={data}
      bordered
      cellBordered
      autoHeight
      affixHeader
      affixHorizontalScrollbar
    >
      <Column width={50} align="center" fixed resizable>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={100} fixed resizable>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={100} resizable>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200}>
        <HeaderCell>Company</HeaderCell>
        <Cell dataKey="company" />
      </Column>

      <Column width={200} resizable>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Street</HeaderCell>
        <Cell dataKey="street" />
      </Column>

      <Column width={100}>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column width={100}>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={150}>
        <HeaderCell>Postcode</HeaderCell>
        <Cell dataKey="postcode" />
      </Column>

      <Column width={300}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>

      <Column width={200}>
        <HeaderCell>Phone</HeaderCell>
        <Cell dataKey="phone" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
