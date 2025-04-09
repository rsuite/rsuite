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
  Box,
  Text,
  Divider
} from 'rsuite';
import faker from '@faker-js/faker';
import { mockUsers } from './mock';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20).map(user => ({
  ...user,
  age: faker.number.int({ min: 20, max: 65 }),
  salary: faker.number.int({ min: 30000, max: 120000 }),
  active: faker.datatype.boolean()
}));

// Custom header cell with filter and sort
const CustomHeaderCell = ({ children, onFilter, filterType, dataKey, onSort, ...rest }) => {
  const ref = React.useRef();
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [sortDirection, setSortDirection] = React.useState(null);
  // Store the current filter value to restore it when reopening the popover
  const [currentFilterValue, setCurrentFilterValue] = React.useState(null);

  const handleApplyFilter = value => {
    setIsFiltered(!!value);
    setCurrentFilterValue(value); // Store the current filter value
    onFilter(dataKey, value);
    ref.current?.close();
  };

  const handleClearFilter = () => {
    setIsFiltered(false);
    setCurrentFilterValue(null); // Clear the stored filter value
    onFilter(dataKey, null);
    handleSort(null);
    ref.current?.close();
  };

  // Prevent event bubbling to the header cell
  const stopPropagation = event => {
    event.stopPropagation();
  };

  // Handle custom sorting
  const handleSort = direction => {
    setSortDirection(direction);
    // Get the App component's handleSortColumn function from context or props
    onSort?.(dataKey, direction);
    ref.current?.close();
  };

  // Common filter action buttons
  const FilterActions = ({ onApply, value }) => (
    <HStack mt={10} justify="flex-end" spacing={10}>
      <Button appearance="subtle" onClick={handleClearFilter} size="xs">
        Clear
      </Button>
      <Button appearance="primary" onClick={onApply} size="xs">
        Apply
      </Button>
    </HStack>
  );

  let FilterComponent = null;

  switch (filterType) {
    case 'text':
      FilterComponent = ({ onFilter, close }) => {
        // Initialize with the current filter value if available
        const [value, setValue] = React.useState(currentFilterValue || '');
        return (
          <Box w={250}>
            <Text muted mb={10}>
              Filter by {children}
            </Text>
            <InputGroup inside size="sm">
              <Input placeholder={`Type to filter...`} value={value} onChange={setValue} />
              {value && (
                <InputGroup.Button onClick={() => setValue('')}>
                  <CloseOutlineIcon />
                </InputGroup.Button>
              )}
            </InputGroup>
            <FilterActions onApply={() => handleApplyFilter(value)} />
          </Box>
        );
      };
      break;

    case 'number':
      FilterComponent = ({ onFilter, close }) => {
        // Initialize with the current filter values if available
        const [min, setMin] = React.useState(currentFilterValue?.min || '');
        const [max, setMax] = React.useState(currentFilterValue?.max || '');

        const handleApply = () => {
          const hasFilter = min !== '' || max !== '';
          handleApplyFilter(hasFilter ? { min, max } : null);
        };

        return (
          <Box w={250}>
            <Text muted mb={10}>
              Filter by {children}
            </Text>
            <HStack spacing={10}>
              <Input placeholder="Min" size="sm" type="number" value={min} onChange={setMin} />
              <span>to</span>
              <Input placeholder="Max" size="sm" type="number" value={max} onChange={setMax} />
            </HStack>
            <FilterActions onApply={handleApply} onClear={handleClearFilter} />
          </Box>
        );
      };
      break;

    case 'date':
      FilterComponent = ({ onFilter, close }) => {
        // Initialize with the current filter value if available
        const [value, setValue] = React.useState(currentFilterValue || null);
        // Create a reference to the Popover content element
        const containerRef = React.useRef(null);

        return (
          <Box w={250} ref={containerRef}>
            <Text muted mb={10}>
              Filter by {children}
            </Text>
            <DateRangePicker
              showOneCalendar
              size="sm"
              value={value}
              onChange={setValue}
              container={() => containerRef.current}
            />
            <FilterActions onApply={() => handleApplyFilter(value)} />
          </Box>
        );
      };
      break;

    case 'options':
      FilterComponent = ({ onFilter, close }) => {
        // Initialize with the current filter value if available
        const [value, setValue] = React.useState(currentFilterValue);
        // Create a reference to the Popover content element
        const containerRef = React.useRef(null);

        const options = [
          { label: 'Active', value: true },
          { label: 'Inactive', value: false }
        ];

        return (
          <Box w={250} ref={containerRef}>
            <Text muted mb={10}>
              Filter by {children}
            </Text>
            <InputPicker
              data={options}
              size="sm"
              value={value}
              onChange={setValue}
              w="100%"
              cleanable
              container={() => containerRef.current}
            />
            <FilterActions onApply={() => handleApplyFilter(value)} />
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
              <Box p={10}>
                {/* Sort Controls */}
                <Box>
                  <Text muted mb={10}>
                    Sort {children}
                  </Text>
                  <HStack spacing={10}>
                    <Button
                      appearance={sortDirection === 'asc' ? 'primary' : 'default'}
                      onClick={() => handleSort('asc')}
                      startIcon={<FaSortAmountUp />}
                      size="xs"
                      block
                    >
                      Ascending
                    </Button>
                    <Button
                      appearance={sortDirection === 'desc' ? 'primary' : 'default'}
                      onClick={() => handleSort('desc')}
                      startIcon={<FaSortAmountDown />}
                      size="xs"
                      block
                    >
                      Descending
                    </Button>
                  </HStack>
                </Box>

                {/* Filter Controls */}
                {FilterComponent && (
                  <>
                    <Divider />
                    <FilterComponent onFilter={handleApplyFilter} />
                  </>
                )}
              </Box>
            </Popover>
          }
        >
          <IconButton
            appearance={isFiltered || sortDirection ? 'primary' : 'subtle'}
            size="xs"
            color="blue"
            icon={
              sortDirection ? (
                sortDirection === 'asc' ? (
                  <FaSortAmountUp />
                ) : (
                  <FaSortAmountDown />
                )
              ) : (
                <FaFilter />
              )
            }
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
      // Remove default table sorting UI, we'll use our custom sort buttons
      sortColumn={sortColumn}
      sortType={sortType}
    >
      <Column width={60} align="center">
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={140}>
        <CustomHeaderCell filterType="text" onFilter={handleFilter} onSort={handleSortColumn}>
          Name
        </CustomHeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={180}>
        <CustomHeaderCell filterType="text" onFilter={handleFilter} onSort={handleSortColumn}>
          Email
        </CustomHeaderCell>
        <Cell dataKey="email" />
      </Column>

      <Column width={100}>
        <CustomHeaderCell filterType="number" onFilter={handleFilter} onSort={handleSortColumn}>
          Age
        </CustomHeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={140}>
        <CustomHeaderCell filterType="date" onFilter={handleFilter} onSort={handleSortColumn}>
          Join Date
        </CustomHeaderCell>
        <Cell dataKey="joinDate">
          {rowData => {
            return new Date(rowData.joinDate).toLocaleDateString();
          }}
        </Cell>
      </Column>

      <Column width={140}>
        <CustomHeaderCell filterType="text" onFilter={handleFilter} onSort={handleSortColumn}>
          Company
        </CustomHeaderCell>
        <Cell dataKey="company" />
      </Column>

      <Column width={120}>
        <CustomHeaderCell filterType="number" onFilter={handleFilter} onSort={handleSortColumn}>
          Salary
        </CustomHeaderCell>
        <Cell dataKey="salary">{rowData => `$${rowData.salary.toLocaleString()}`}</Cell>
      </Column>

      <Column width={100}>
        <CustomHeaderCell filterType="options" onFilter={handleFilter} onSort={handleSortColumn}>
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
