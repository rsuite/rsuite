<!--start-code-->

```js
import { Table, InputGroup, Input, HStack, VStack, SelectPicker, Button, Tag, Box } from 'rsuite';
import { mockUsers } from './mock';
import { VscFilter, VscFilterFilled } from 'react-icons/vsc';
import { TbFilter, TbFilterOff } from 'react-icons/tb';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

// Extract unique values for filters
const getCities = () => {
  const cities = [...new Set(data.map(item => item.city))];
  return cities.map(city => ({ label: city, value: city }));
};

const getCompanies = () => {
  const companies = [...new Set(data.map(item => item.company))];
  return companies.map(company => ({ label: company, value: company }));
};

// Custom filter cell component
const FilterCell = ({ column, onFilter }) => {
  return (
    <InputGroup inside size="xs" style={{ width: '100%' }}>
      <Input placeholder={`Filter ${column}`} onChange={value => onFilter(column, value)} />
      <InputGroup.Button>
        <VscFilter />
      </InputGroup.Button>
    </InputGroup>
  );
};

const App = () => {
  const [filters, setFilters] = React.useState({});
  const [filteredData, setFilteredData] = React.useState(data);
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  // Filter values
  const [cityFilter, setCityFilter] = React.useState(null);
  const [companyFilter, setCompanyFilter] = React.useState(null);
  const [nameFilter, setNameFilter] = React.useState('');

  const handleColumnFilter = (columnKey, value) => {
    if (value) {
      setFilters({ ...filters, [columnKey]: value });
    } else {
      const newFilters = { ...filters };
      delete newFilters[columnKey];
      setFilters(newFilters);
    }
  };

  const applyFilters = () => {
    let result = [...data];

    // Apply name filter
    if (nameFilter) {
      result = result.filter(item => item.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }

    // Apply city filter
    if (cityFilter) {
      result = result.filter(item => item.city === cityFilter);
    }

    // Apply company filter
    if (companyFilter) {
      result = result.filter(item => item.company === companyFilter);
    }

    setFilteredData(result);
    setShowFilterPanel(false);
  };

  const clearFilters = () => {
    setCityFilter(null);
    setCompanyFilter(null);
    setNameFilter('');
    setFilters({});
    setFilteredData(data);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (nameFilter) count++;
    if (cityFilter) count++;
    if (companyFilter) count++;
    return count;
  };

  return (
    <>
      <Box mb={10}>
        <HStack spacing={8} alignItems="center">
          <Button
            appearance="subtle"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            startIcon={countActiveFilters() > 0 ? <VscFilterFilled /> : <VscFilter />}
          >
            {countActiveFilters() > 0 ? 'Filters Applied' : 'Filter'}
            {countActiveFilters() > 0 && (
              <Tag color="green" style={{ marginLeft: 8 }}>
                {countActiveFilters()}
              </Tag>
            )}
          </Button>

          {countActiveFilters() > 0 && (
            <Button
              appearance="subtle"
              color="red"
              startIcon={<TbFilterOff />}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          )}
        </HStack>
      </Box>

      {showFilterPanel && (
        <VStack mb={20} p={15} bd="1px solid #e5e5ea" rounded={6}>
          <HStack spacing={10} w="100%">
            <VStack w="100%">
              <Box>Name</Box>
              <Input placeholder="Filter by name" value={nameFilter} onChange={setNameFilter} />
            </VStack>

            <VStack w="100%">
              <Box>City</Box>
              <SelectPicker
                data={getCities()}
                block
                placeholder="Select city"
                value={cityFilter}
                onChange={setCityFilter}
                cleanable
              />
            </VStack>

            <VStack w="100%">
              <Box>Company</Box>
              <SelectPicker
                data={getCompanies()}
                block
                placeholder="Select company"
                value={companyFilter}
                onChange={setCompanyFilter}
                cleanable
              />
            </VStack>
          </HStack>

          <HStack mt={15} justify="flex-end" spacing={10}>
            <Button appearance="subtle" onClick={() => setShowFilterPanel(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={applyFilters} startIcon={<TbFilter />}>
              Apply Filters
            </Button>
          </HStack>
        </VStack>
      )}

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

        <Column width={200}>
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
