<!--start-code-->

```js
import { Table, Toggle, TagPicker, VStack, HStack } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

const CompactCell = props => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = props => <HeaderCell {...props} style={{ padding: 4 }} />;

const defaultColumns = [
  {
    key: 'id',
    label: 'Id',
    fixed: true,
    width: 70
  },
  {
    key: 'firstName',
    label: 'First Name',
    fixed: true,
    width: 130
  },
  {
    key: 'lastName',
    label: 'Last Name',
    width: 123
  },

  {
    key: 'gender',
    label: 'Gender',
    width: 200
  },
  {
    key: 'city',
    label: 'City',
    flexGrow: 1
  }
];

const App = () => {
  const [compact, setCompact] = React.useState(true);
  const [bordered, setBordered] = React.useState(true);
  const [showHeader, setShowHeader] = React.useState(true);
  const [hover, setHover] = React.useState(true);
  const [columnKeys, setColumnKeys] = React.useState(defaultColumns.map(column => column.key));

  const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  return (
    <div>
      <VStack spacing={16}>
        <HStack>
          <Toggle checked={compact} onChange={setCompact}>
            Compact
          </Toggle>

          <Toggle checked={bordered} onChange={setBordered}>
            Bordered
          </Toggle>

          <Toggle checked={showHeader} onChange={setShowHeader}>
            Show Header
          </Toggle>

          <Toggle checked={hover} onChange={setHover}>
            Hover
          </Toggle>
        </HStack>
        <TagPicker
          data={defaultColumns}
          labelKey="label"
          valueKey="key"
          value={columnKeys}
          onChange={setColumnKeys}
          cleanable={false}
        />
      </VStack>
      <hr />

      <Table
        height={300}
        hover={hover}
        showHeader={showHeader}
        data={data}
        bordered={bordered}
        cellBordered={bordered}
        headerHeight={compact ? 30 : 40}
        rowHeight={compact ? 30 : 46}
      >
        {columns.map(column => {
          const { key, label, ...rest } = column;
          return (
            <Column {...rest} key={key}>
              <CustomHeaderCell>{label}</CustomHeaderCell>
              <CustomCell dataKey={key} />
            </Column>
          );
        })}
      </Table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
