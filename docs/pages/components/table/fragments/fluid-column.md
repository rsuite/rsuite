<!--start-code-->

```js
import { Table } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(8);

const App = () => {
  return (
    <Table
      height={420}
      data={data}
      bordered
      cellBordered
      onSortColumn={(sortColumn, sortType) => {
        console.log(sortColumn, sortType);
      }}
    >
      <Column width={50} align="center">
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>
          Name <code>flexGrow={2}</code>
        </HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>
          City <code>flexGrow={1}</code>
        </HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
