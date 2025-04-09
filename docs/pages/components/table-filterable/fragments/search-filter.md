<!--start-code-->

```js
import { Table, InputGroup, Input, Box } from 'rsuite';
import { mockUsers } from './mock';
import SearchIcon from "@rsuite/icons/Search";
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

const App = () => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  const handleSearch = value => {
    setSearchKeyword(value);

    // Filter data across all columns
    const filtered = data.filter(item => {
      // Check each field for matches
      return Object.keys(item).some(key =>
        String(item[key]).toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  return (
    <>
      <Box mb={10}>
        <InputGroup inside style={{ width: 300 }}>
          <Input placeholder="Search..." value={searchKeyword} onChange={handleSearch} />
          {searchKeyword ? (
            <InputGroup.Button onClick={() => handleSearch('')}>
              <CloseOutlineIcon />
            </InputGroup.Button>
          ) : (
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          )}
        </InputGroup>
      </Box>

      <Table height={400} data={filteredData} bordered cellBordered>
        <Column width={80} fixed>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={150}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={200}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column width={150}>
          <HeaderCell>City</HeaderCell>
          <Cell dataKey="city" />
        </Column>

        <Column width={150}>
          <HeaderCell>Street</HeaderCell>
          <Cell dataKey="street" />
        </Column>

        <Column width={150}>
          <HeaderCell>Company</HeaderCell>
          <Cell dataKey="company" />
        </Column>
      </Table>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
