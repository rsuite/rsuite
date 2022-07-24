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
          Email <code>flexGrow={2}</code>
        </HeaderCell>
        <Cell dataKey="email" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
