<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const rowKey = 'id';
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
  <Cell {...props}>
    <IconButton
      size="xs"
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some((key) => key === rowData[rowKey]) ? <MinusSquareO /> : <PlusSquareO />
      }
    />
  </Cell>
);

const renderRowExpanded = (rowData) => {
  return (
    <div>
      <div
        style={{
          width: 60,
          height: 60,
          float: 'left',
          marginRight: 10,
          background: '#eee',
        }}
      >
        <img src={rowData.avartar} style={{ width: 60 }} />
      </div>
      <p>{rowData.email}</p>
      <p>{rowData.date}</p>
    </div>
  );
};

const App = () => {
  const data = fakeData.filter((v, i) => i < 5);
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };

  return (
    <Table
      height={300}
      data={data}
      rowKey={rowKey}
      expandedRowKeys={expandedRowKeys}
      onRowClick={(data) => {
        console.log(data);
      }}
      renderRowExpanded={renderRowExpanded}
    >
      <Column width={70} align="center">
        <HeaderCell>#</HeaderCell>
        <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
      </Column>

      <Column width={130}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Street</HeaderCell>
        <Cell dataKey="street" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
