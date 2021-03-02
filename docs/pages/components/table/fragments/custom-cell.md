<!--start-code-->

```js
const NameCell = ({ rowData, dataKey, ...props }) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Name:</b> {`${rowData.firstName} ${rowData.lastName}`}{' '}
      </p>
      <p>
        <b>Email:</b> {rowData.email}{' '}
      </p>
      <p>
        <b>Company:</b> {rowData.companyName}{' '}
      </p>
      <p>
        <b>Sentence:</b> {rowData.sentence}{' '}
      </p>
    </Popover>
  );

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <a>{rowData[dataKey].toLocaleString()}</a>
      </Whisper>
    </Cell>
  );
};

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 20,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img src={rowData[dataKey]} width="40" />
    </div>
  </Cell>
);

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some(item => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const renderMenu = ({ onClose, left, top, className }, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
        <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
        <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
        <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
        <Dropdown.Item eventKey={7}>About</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
  }
  return (
    <Cell {...props} className="link-group">
      <IconButton appearance="subtle" onClick={handleAction} icon={<Edit2 />} />
      <Divider vertical />
      <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
        <IconButton appearance="subtle" icon={<More />} />
      </Whisper>
    </Cell>
  );
};

const data = fakeData.filter((v, i) => i < 5);

const App = () => {
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };

  return (
    <Table height={300} data={data} id="table">
      <Column width={50} align="center">
        <HeaderCell style={{ padding: 0 }}>
          <div style={{ lineHeight: '40px' }}>
            <Checkbox
              inline
              checked={checked}
              indeterminate={indeterminate}
              onChange={handleCheckAll}
            />
          </div>
        </HeaderCell>
        <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
      </Column>
      <Column width={80} align="center">
        <HeaderCell>Avartar</HeaderCell>
        <ImageCell dataKey="avartar" />
      </Column>

      <Column width={160}>
        <HeaderCell>First Name</HeaderCell>
        <NameCell dataKey="firstName" />
      </Column>

      <Column width={300}>
        <HeaderCell>Email</HeaderCell>
        <Cell>{rowData => <a href={`mailto:${rowData.email}`}>{rowData.email}</a>}</Cell>
      </Column>

      <Column width={200}>
        <HeaderCell>Action</HeaderCell>
        <ActionCell dataKey="id" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
