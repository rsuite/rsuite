<!--start-code-->

```js
import { Table, Button, IconButton, Input, DatePicker, InputNumber } from 'rsuite';
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const defaultData = mockUsers(8);

const styles = `
.table-cell-editing .rs-table-cell-content {
  padding: 4px;
}
.table-cell-editing .rs-input {
  width: 100%;
}
`;

const App = () => {
  const [data, setData] = React.useState(defaultData);

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find(item => item.id === id)[key] = value;
    setData(nextData);
  };
  const handleEdit = id => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find(item => item.id === id);

    activeItem.status = activeItem.status ? null : 'EDIT';

    setData(nextData);
  };

  const handleRemove = id => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <>
      <style>{styles}</style>

      <Button
        onClick={() => {
          setData([
            { id: data.length + 1, name: '', age: 0, birthdate: null, status: 'EDIT' },
            ...data
          ]);
        }}
      >
        Add record
      </Button>
      <hr />
      <Table height={420} data={data}>
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <EditableCell
            dataKey="name"
            dataType="string"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column>

        <Column width={200}>
          <HeaderCell>Age</HeaderCell>
          <EditableCell
            dataKey="age"
            dataType="number"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column>

        <Column width={200}>
          <HeaderCell>Birthday</HeaderCell>
          <EditableCell
            dataKey="birthdate"
            dataType="date"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column>

        <Column width={100}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey="id" onEdit={handleEdit} onRemove={handleRemove} />
        </Column>
      </Table>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

function toValueString(value, dataType) {
  return dataType === 'date' ? value?.toLocaleDateString() : value;
}

const fieldMap = {
  string: Input,
  number: InputNumber,
  date: DatePicker
};

const EditableCell = ({ rowData, dataType, dataKey, onChange, onEdit, ...props }) => {
  const editing = rowData.status === 'EDIT';

  const Field = fieldMap[dataType];
  const value = rowData[dataKey];
  const text = toValueString(value, dataType);

  return (
    <Cell
      {...props}
      className={editing ? 'table-cell-editing' : ''}
      onDoubleClick={() => {
        onEdit?.(rowData.id);
      }}
    >
      {editing ? (
        <Field
          defaultValue={value}
          onChange={value => {
            onChange?.(rowData.id, dataKey, value);
          }}
        />
      ) : (
        text
      )}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onEdit, onRemove, ...props }) => {
  return (
    <Cell {...props} style={{ padding: '6px', display: 'flex', gap: '4px' }}>
      <IconButton
        appearance="subtle"
        icon={rowData.status === 'EDIT' ? <VscSave /> : <VscEdit />}
        onClick={() => {
          onEdit(rowData.id);
        }}
      />
      <IconButton
        appearance="subtle"
        icon={<VscRemove />}
        onClick={() => {
          onRemove(rowData.id);
        }}
      />
    </Cell>
  );
};
```

<!--end-code-->
