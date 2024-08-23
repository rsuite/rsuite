<!--start-code-->

```js
import { Table, CheckPicker, IconButton, Popover, Dropdown, Whisper } from 'rsuite';
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

const App = () => {
  const [filterColumns, setFilterColumns] = React.useState(columns);
  const handleCustomAction = (eventKey, dataKey) => {
    switch (eventKey) {
      case 'sort-asc':
        console.log('sort-asc');
        break;
      case 'sort-desc':
        console.log('sort-desc');
        break;
      case 'hide':
        setFilterColumns(filterColumns.filter(col => col.key !== dataKey));
        break;
      case 'align-left':
        setFilterColumns(
          filterColumns.map(col => {
            if (col.key === dataKey) {
              return { ...col, align: 'left' };
            }
            return col;
          })
        );
        break;
      case 'align-center':
        setFilterColumns(
          filterColumns.map(col => {
            if (col.key === dataKey) {
              return { ...col, align: 'center' };
            }
            return col;
          })
        );

        break;
      case 'align-right':
        setFilterColumns(
          filterColumns.map(col => {
            if (col.key === dataKey) {
              return { ...col, align: 'right' };
            }
            return col;
          })
        );
        break;
      default:
        break;
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
      <Table height={420} data={data} bordered cellBordered>
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
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Item eventKey="align-left" icon={<FaAlignLeft />}>
        Align Left
      </Dropdown.Item>
      <Dropdown.Item eventKey="align-center" icon={<FaAlignCenter />}>
        Align Center
      </Dropdown.Item>
      <Dropdown.Item eventKey="align-right" icon={<FaAlignRight />}>
        Align Right
      </Dropdown.Item>

      <Dropdown.Separator />
      <Dropdown.Item eventKey="sort-asc" icon={<FaArrowUp />}>
        Sort Asc
      </Dropdown.Item>
      <Dropdown.Item eventKey="sort-desc" icon={<FaArrowDown />}>
        Sort Desc
      </Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item eventKey="hide" icon={<BiHide />}>
        Hide Column
      </Dropdown.Item>
    </Dropdown.Menu>
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
