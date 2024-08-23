<!--start-code-->

```js
import { Table, Button, IconButton, Input, DateInput, InputNumber } from 'rsuite';
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
.table-cell:focus {
  outline: none;
  box-shadow: inset 0 0 0 1px #007bff;
}
`;

const EditableContext = React.createContext({ editingId: null, editingKey: null });

const App = () => {
  const [data, setData] = React.useState(defaultData);
  const [editingId, setEditingId] = React.useState(null);
  const [editingKey, setEditingKey] = React.useState(null);

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find(item => item.id === id)[key] = value;

    setData(nextData);
  };

  const onEdit = (id, dataKey) => {
    setEditingId(id);
    setEditingKey(dataKey);
  };

  const onEditFinished = () => {
    setEditingId(null);
    setEditingKey(null);
  };

  const handleRemove = id => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <EditableContext.Provider value={{ editingId, editingKey, onEdit, onEditFinished }}>
      <style>{styles}</style>
      <Table height={420} data={data}>
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <EditableCell dataKey="name" dataType="string" onChange={handleChange} />
        </Column>

        <Column width={200}>
          <HeaderCell>Age</HeaderCell>
          <EditableCell dataKey="age" dataType="number" onChange={handleChange} />
        </Column>

        <Column width={200}>
          <HeaderCell>Birthday</HeaderCell>
          <EditableCell dataKey="birthdate" dataType="date" onChange={handleChange} />
        </Column>
      </Table>
    </EditableContext.Provider>
  );
};

function toValueString(value, dataType) {
  return dataType === 'date' ? value?.toLocaleDateString() : value;
}

const fieldMap = {
  string: Input,
  number: InputNumber,
  date: DateInput
};

function focus(ref) {
  setTimeout(() => {
    if (ref.current?.tagName === 'INPUT' || ref.current?.getAttribute('tabindex') === '0') {
      ref.current.focus();
    } else if (ref.current instanceof HTMLElement) {
      ref.current.querySelector('input').focus();
    }
  }, 0);
}

const EditableCell = ({ rowData, dataType, dataKey, onChange, ...props }) => {
  const { editingId, editingKey, onEdit, onEditFinished } = React.useContext(EditableContext);
  const editing = rowData.id === editingId && dataKey === editingKey;
  const Field = fieldMap[dataType];
  const value = rowData[dataKey];
  const text = toValueString(value, dataType);
  const inputRef = React.useRef();
  const cellRef = React.useRef();

  const handleEdit = () => {
    onEdit?.(rowData.id, dataKey);
    focus(inputRef);
  };

  const handleFinished = () => {
    onEditFinished();
    focus(cellRef);
  };

  return (
    <Cell
      {...props}
      ref={cellRef}
      tabIndex={0}
      className={editing ? 'table-cell-editing' : 'table-cell'}
      onDoubleClick={handleEdit}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleEdit();
        }
      }}
    >
      {editing ? (
        <Field
          ref={inputRef}
          defaultValue={value}
          onBlur={handleFinished}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleFinished();
            }
          }}
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

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
