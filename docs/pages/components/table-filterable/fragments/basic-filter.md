<!--start-code-->

```js
import { Table, CheckPicker, Box } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

const columns = [
  {
    key: 'id',
    title: 'ID',
    width: 80
  },
  {
    key: 'name',
    title: 'Name',
    width: 150
  },
  {
    key: 'email',
    title: 'Email',
    width: 200
  },
  {
    key: 'city',
    title: 'City',
    width: 150
  },
  {
    key: 'street',
    title: 'Street',
    width: 150
  },
  {
    key: 'postcode',
    title: 'Postcode',
    width: 120
  },
  {
    key: 'company',
    title: 'Company',
    width: 200
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    width: 150
  }
];

const App = () => {
  const [filterColumns, setFilterColumns] = React.useState(columns);

  return (
    <>
      <Box mb={10}>
        <CheckPicker
          data={columns}
          valueKey="key"
          labelKey="title"
          cleanable={false}
          searchable={false}
          value={filterColumns.map(column => column.key)}
          onChange={value => {
            setFilterColumns(value.map(key => columns.find(column => column.key === key)));
          }}
          placeholder="Filter Columns"
          renderValue={value => `Columns Selected (${value.length})`}
          w={200}
        />
      </Box>

      <Table height={400} data={data} bordered cellBordered>
        {filterColumns.map(column => {
          const { key, title, ...rest } = column;
          return (
            <Column {...rest} key={key}>
              <HeaderCell>{title}</HeaderCell>
              <Cell dataKey={key} />
            </Column>
          );
        })}
      </Table>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
