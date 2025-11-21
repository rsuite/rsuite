<!--start-code-->

```js
import { Table, CheckPicker, IconButton, Popover, Menu, Whisper } from 'rsuite';
import { IoMdMore } from 'react-icons/io';
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { BiHide } from 'react-icons/bi';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(8);

const columns = [
  {
    key: 'id',
    title: 'Id',
    width: 100
  },
  {
    key: 'name',
    title: 'Name',
    flexGrow: 1
  },

  {
    key: 'city',
    title: 'City',
    width: 200
  },
  {
    key: 'email',
    title: 'Email',
    width: 200
  }
];

const styles = `
.custom-header-cell .rs-table-cell-content{
  position: relative;
  padding-right: 40px;
}
.custom-header-button {
  position: absolute;
  right: 10px;
}
`;

const useTableConfiguration = (defaultColumns, defaultData) => {
  const [columns, setColumns] = React.useState(defaultColumns);
  const [data, setData] = React.useState(defaultData);

  const handleSort = (dataKey, sortType) => {
    setData(prevData => {
      return [...prevData].sort((a, b) => {
        if (typeof a[dataKey] === 'string') {
          return sortType === 'asc'
            ? a[dataKey].localeCompare(b[dataKey])
            : b[dataKey].localeCompare(a[dataKey]);
        }
        return sortType === 'asc' ? a[dataKey] - b[dataKey] : b[dataKey] - a[dataKey];
      });
    });
  };

  const handleAlign = (dataKey, align) => {
    setColumns(prevColumns =>
      prevColumns.map(col => (col.key === dataKey ? { ...col, align } : col))
    );
  };

  const handleHide = dataKey => {
    setColumns(prevColumns => prevColumns.filter(col => col.key !== dataKey));
  };

  return {
    columns,
    setColumns,
    data,
    handleSort,
    handleAlign,
    handleHide
  };
};

const App = () => {
  const {
    columns: filterColumns,
    setColumns: setFilterColumns,
    data: tableData,
    handleSort,
    handleAlign,
    handleHide
  } = useTableConfiguration(columns, data);

  const handleCustomAction = (eventKey, dataKey) => {
    if (eventKey === 'sort-asc') {
      handleSort(dataKey, 'asc');
    } else if (eventKey === 'sort-desc') {
      handleSort(dataKey, 'desc');
    } else if (eventKey === 'hide') {
      handleHide(dataKey);
    } else if (eventKey.startsWith('align-')) {
      handleAlign(dataKey, eventKey.split('-')[1]);
    }
  };

  return (
    <>
      <style>{styles}</style>
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
        renderValue={value => 'Filter Columns'}
        style={{ marginBottom: 10 }}
      />
      <Table height={420} data={tableData} bordered cellBordered>
        {filterColumns.map(column => {
          const { key, title, ...rest } = column;
          return (
            <Column {...rest} resizable>
              <CustomHeaderCell
                onAction={eventKey => {
                  handleCustomAction(eventKey, key);
                }}
              >
                {title}
              </CustomHeaderCell>
              <Cell dataKey={column.key} />
            </Column>
          );
        })}
      </Table>
    </>
  );
};

const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
  <Popover ref={ref} {...rest} full>
    <Menu onSelect={onSelect}>
      <Menu.Item eventKey="align-left" icon={<FaAlignLeft />}>
        Align Left
      </Menu.Item>
      <Menu.Item eventKey="align-center" icon={<FaAlignCenter />}>
        Align Center
      </Menu.Item>
      <Menu.Item eventKey="align-right" icon={<FaAlignRight />}>
        Align Right
      </Menu.Item>

      <Menu.Separator />
      <Menu.Item eventKey="sort-asc" icon={<FaArrowUp />}>
        Sort Asc
      </Menu.Item>
      <Menu.Item eventKey="sort-desc" icon={<FaArrowDown />}>
        Sort Desc
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item eventKey="hide" icon={<BiHide />}>
        Hide Column
      </Menu.Item>
    </Menu>
  </Popover>
));

const CustomHeaderCell = ({ children, onAction, ...rest }) => {
  const ref = React.useRef();
  const handleSelectMenu = eventKey => {
    onAction(eventKey);
    ref.current?.close();
  };
  return (
    <HeaderCell {...rest} className="custom-header-cell">
      <span>{children}</span>
      <Whisper
        ref={ref}
        placement="bottomEnd"
        trigger="click"
        speaker={<MenuPopover onSelect={handleSelectMenu} />}
      >
        <IconButton
          appearance="subtle"
          icon={<IoMdMore />}
          size="xs"
          className="custom-header-button"
        />
      </Whisper>
    </HeaderCell>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
