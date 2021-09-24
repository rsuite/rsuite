<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const CompactCell = props => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = props => (
  <HeaderCell {...props} style={{ padding: 4, backgroundColor: '#3498ff', color: '#fff' }} />
);

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
    key: 'city',
    label: 'City',
    width: 200
  },
  {
    key: 'street',
    label: 'Street',
    flexGrow: 1
  }
];

const App = () => {
  const data = fakeData.filter((v, i) => i < 10);
  const [loading, setLoading] = React.useState(false);
  const [compact, setCompact] = React.useState(true);
  const [bordered, setBordered] = React.useState(true);
  const [noData, setNoData] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(true);
  const [autoHeight, setAutoHeight] = React.useState(false);
  const [hover, setHover] = React.useState(true);
  const [columnKeys, setColumnKeys] = React.useState(defaultColumns.map(column => column.key));

  const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  return (
    <div>
      <div>
        <span>
          Compact：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={compact}
            onChange={setCompact}
          />
        </span>

        <span>
          Bordered：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={bordered}
            onChange={setBordered}
          />
        </span>

        <span>
          Show Header：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={showHeader}
            onChange={setShowHeader}
          />
        </span>

        <span>
          Hover：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={hover}
            onChange={setHover}
          />
        </span>
        <hr />
        <span>
          Loading：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={loading}
            onChange={setLoading}
          />
        </span>

        <span>
          No data：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={noData}
            onChange={setNoData}
          />
        </span>

        <span>
          Auto Height：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={autoHeight}
            onChange={setAutoHeight}
          />
        </span>
      </div>
      <hr />
      Columns：<TagPicker
        data={defaultColumns}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      />
      <hr />
      <Table
        loading={loading}
        height={300}
        hover={hover}
        showHeader={showHeader}
        autoHeight={autoHeight}
        data={noData ? [] : data}
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

ReactDOM.render(<App />);
```

<!--end-code-->
