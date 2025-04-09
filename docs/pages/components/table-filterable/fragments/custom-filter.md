<!--start-code-->

```js
import {
  Table,
  Popover,
  IconButton,
  Whisper,
  InputGroup,
  Input,
  DateRangePicker,
  InputPicker,
  HStack,
  Button,
  Tag,
  Box
} from 'rsuite';
import { mockUsers } from './mock';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20).map(user => ({
  ...user,
  age: faker.number.int({ min: 20, max: 65 }),
  salary: faker.number.int({ min: 30000, max: 120000 }),
  active: faker.datatype.boolean()
}));

// Custom header cell with filter
const CustomHeaderCell = ({ children, onFilter, filterType, dataKey, ...rest }) => {
  const ref = React.useRef();
  const [isFiltered, setIsFiltered] = React.useState(false);

  const handleApplyFilter = value => {
    setIsFiltered(!!value);
    onFilter(dataKey, value);
    ref.current?.close();
  };

  const handleClearFilter = () => {
    setIsFiltered(false);
    onFilter(dataKey, null);
    ref.current?.close();
  };

  // Prevent event bubbling to the header cell
  const stopPropagation = event => {
    event.stopPropagation();
  };

  let FilterComponent = null;

  switch (filterType) {
    case 'text':
      FilterComponent = ({ onFilter, close }) => {
        const [value, setValue] = React.useState('');
        return (
          <Box p={10} w={250}>
            <Box as="h5" mb={10}>
              Filter by {children}
            </Box>
            <InputGroup inside>
              <Input placeholder={`Type to filter...`} value={value} onChange={setValue} />
              {value && (
                <InputGroup.Button onClick={() => setValue('')}>
                  <IoIosCloseCircle />
                </InputGroup.Button>
              )}
            </InputGroup>
            <HStack mt={10} justify="flex-end" spacing={10}>
              <Button appearance="subtle" onClick={handleClearFilter}>
                Clear
              </Button>
              <Button appearance="primary" onClick={() => handleApplyFilter(value)}>
                Apply
              </Button>
            </HStack>
          </Box>
        );
      };
      break;

    case 'number':
      FilterComponent = ({ onFilter, close }) => {
        const [min, setMin] = React.useState('');
        const [max, setMax] = React.useState('');

        const handleApply = () => {
          const hasFilter = min !== '' || max !== '';
          handleApplyFilter(hasFilter ? { min, max } : null);
        };

        return (
          <Box p={10} w={250}>
            <Box as="h5" mb={10}>
              Filter by {children}
            </Box>
            <HStack spacing={10}>
              <Input placeholder="Min" type="number" value={min} onChange={setMin} />
              <span>to</span>
              <Input placeholder="Max" type="number" value={max} onChange={setMax} />
            </HStack>
            <HStack mt={10} justify="flex-end" spacing={10}>
              <Button appearance="subtle" onClick={handleClearFilter}>
                Clear
              </Button>
              <Button appearance="primary" onClick={handleApply}>
                Apply
              </Button>
            </HStack>
          </Box>
        );
      };
      break;

    case 'date':
      FilterComponent = ({ onFilter, close }) => {
        const [value, setValue] = React.useState(null);
        // Create a reference to the Popover content element
        const containerRef = React.useRef(null);

        return (
          <Box p={10} w={300} ref={containerRef}>
            <Box as="h5" mb={10}>
              Filter by {children}
            </Box>
            <DateRangePicker
              style={{ width: '100%' }}
              value={value}
              onChange={setValue}
              container={() => containerRef.current}
            />
            <HStack mt={10} justify="flex-end" spacing={10}>
              <Button appearance="subtle" onClick={handleClearFilter}>
                Clear
              </Button>
              <Button appearance="primary" onClick={() => handleApplyFilter(value)}>
                Apply
              </Button>
            </HStack>
          </Box>
        );
      };
      break;

    case 'options':
      FilterComponent = ({ onFilter, close }) => {
        const [value, setValue] = React.useState(null);
        // Create a reference to the Popover content element
        const containerRef = React.useRef(null);

        const options = [
          { label: 'Active', value: true },
          { label: 'Inactive', value: false }
        ];

        return (
          <Box p={10} w={250} ref={containerRef}>
            <Box as="h5" mb={10}>
              Filter by {children}
            </Box>
            <InputPicker
              data={options}
              value={value}
              onChange={setValue}
              w="100%"
              cleanable
              container={() => containerRef.current}
            />
            <HStack mt={10} justify="flex-end" spacing={10}>
              <Button appearance="subtle" onClick={handleClearFilter}>
                Clear
              </Button>
              <Button appearance="primary" onClick={() => handleApplyFilter(value)}>
                Apply
              </Button>
            </HStack>
          </Box>
        );
      };
      break;
  }

  return (
    <HeaderCell dataKey={dataKey} {...rest}>
      <HStack justify="space-between" align="center">
        <span>{children}</span>
        <Whisper
          ref={ref}
          placement="bottomEnd"
          trigger="click"
          speaker={
            <Popover full onClick={stopPropagation}>
              {FilterComponent && <FilterComponent onFilter={handleApplyFilter} />}
            </Popover>
          }
        >
          <IconButton
            appearance="subtle"
            size="xs"
            icon={
              isFiltered ? (
                <Tag color="green">
                  <FaFilter />
                </Tag>
              ) : (
                <FaFilter />
              )
            }
            ml={5}
            onClick={stopPropagation}
          />
        </Whisper>
      </HStack>
    </HeaderCell>
  );
};

const App = () => {
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [filters, setFilters] = React.useState({});
  const [filteredData, setFilteredData] = React.useState(data);

  // Filter handling
  const handleFilter = (columnKey, value) => {
    const newFilters = { ...filters };

    if (value === null) {
      delete newFilters[columnKey];
    } else {
      newFilters[columnKey] = value;
    }

    setFilters(newFilters);
    applyFilters(newFilters, sortColumn, sortType);
  };

  // Sort handling
  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    applyFilters(filters, sortColumn, sortType);
  };

  // Apply all filters and sorting
  const applyFilters = (activeFilters, sortCol, sortDirection) => {
    let filteredResult = [...data];

    // Apply all active filters
    Object.keys(activeFilters).forEach(key => {
      const filterValue = activeFilters[key];

      switch (key) {
        case 'name':
        case 'email':
        case 'company':
          // Text filter
          filteredResult = filteredResult.filter(item =>
            String(item[key]).toLowerCase().includes(filterValue.toLowerCase())
          );
          break;

        case 'age':
        case 'salary':
          // Number range filter
          if (filterValue.min !== '' && filterValue.max !== '') {
            filteredResult = filteredResult.filter(
              item => item[key] >= Number(filterValue.min) && item[key] <= Number(filterValue.max)
            );
          } else if (filterValue.min !== '') {
            filteredResult = filteredResult.filter(item => item[key] >= Number(filterValue.min));
          } else if (filterValue.max !== '') {
            filteredResult = filteredResult.filter(item => item[key] <= Number(filterValue.max));
          }
          break;

        case 'joinDate':
          // Date range filter
          if (filterValue && filterValue[0] && filterValue[1]) {
            const startDate = new Date(filterValue[0]);
            const endDate = new Date(filterValue[1]);

            filteredResult = filteredResult.filter(item => {
              const itemDate = new Date(item[key]);
              return itemDate >= startDate && itemDate <= endDate;
            });
          }
          break;

        case 'active':
          // Boolean filter - ensure we're comparing boolean values
          if (filterValue !== null) {
            // Only filter if a value is selected
            filteredResult = filteredResult.filter(item => item[key] === filterValue);
          }
          break;
      }
    });

    // Apply sorting if available
    if (sortCol && sortDirection) {
      filteredResult.sort((a, b) => {
        const x = a[sortCol];
        const y = b[sortCol];

        if (typeof x === 'string') {
          if (sortDirection === 'asc') {
            return x.localeCompare(y);
          } else {
            return y.localeCompare(x);
          }
        } else {
          if (sortDirection === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        }
      });
    }

    setFilteredData(filteredResult);
  };

  return (
    <Table
      height={500}
      data={filteredData}
      bordered
      cellBordered
      headerHeight={60}
      rowHeight={50}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
    >
      <Column width={60} align="center" sortable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={140} sortable>
        <CustomHeaderCell filterType="text" onFilter={handleFilter}>
          Name
        </CustomHeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={180} sortable>
        <CustomHeaderCell filterType="text" onFilter={handleFilter}>
          Email
        </CustomHeaderCell>
        <Cell dataKey="email" />
      </Column>

      <Column width={100} sortable>
        <CustomHeaderCell filterType="number" onFilter={handleFilter}>
          Age
        </CustomHeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={140} sortable>
        <CustomHeaderCell filterType="date" onFilter={handleFilter}>
          Join Date
        </CustomHeaderCell>
        <Cell dataKey="joinDate">
          {rowData => {
            return new Date(rowData.joinDate).toLocaleDateString();
          }}
        </Cell>
      </Column>

      <Column width={140} sortable>
        <CustomHeaderCell filterType="text" onFilter={handleFilter}>
          Company
        </CustomHeaderCell>
        <Cell dataKey="company" />
      </Column>

      <Column width={120} sortable>
        <CustomHeaderCell filterType="number" onFilter={handleFilter}>
          Salary
        </CustomHeaderCell>
        <Cell dataKey="salary">{rowData => `$${rowData.salary.toLocaleString()}`}</Cell>
      </Column>

      <Column width={100} sortable>
        <CustomHeaderCell filterType="options" onFilter={handleFilter}>
          Status
        </CustomHeaderCell>
        <Cell dataKey="active">
          {rowData => (
            <Tag color={rowData.active ? 'green' : 'red'}>
              {rowData.active ? 'Active' : 'Inactive'}
            </Tag>
          )}
        </Cell>
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
