<!--start-code-->

```js
import { Table, Toggle, TagPicker, HStack } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;

const columns = [
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
  const [autoHeight, setAutoHeight] = React.useState(true);
  const [size, setSize] = React.useState(20);
  const [height, setHeight] = React.useState(400);
  const [maxHeight, setMaxHeight] = React.useState();
  const [minHeight, setMinHeight] = React.useState(200);

  const data = mockUsers(size);

  return (
    <div>
      <VStack spacing={16}>
        <Toggle checked={autoHeight} onChange={setAutoHeight}>
          Auto Height
        </Toggle>

        <VStack>
          <HStack spacing={16}>
            <HStack>
              <Label>data:</Label>
              <InputGroup inside style={{ width: 130 }}>
                <Input size="sm" onChange={setSize} value={size} />
                <InputGroup.Addon>rows</InputGroup.Addon>
              </InputGroup>
            </HStack>

            <HStack>
              <Label>minHeight:</Label>
              <InputGroup inside style={{ width: 130 }}>
                <Input size="sm" onChange={setMinHeight} value={minHeight} />
                <InputGroup.Addon>px</InputGroup.Addon>
              </InputGroup>
            </HStack>
          </HStack>

          <HStack spacing={16}>
            <HStack>
              <Label>height:</Label>
              <InputGroup inside style={{ width: 130 }}>
                <Input size="sm" onChange={setHeight} value={height} />
                <InputGroup.Addon>px</InputGroup.Addon>
              </InputGroup>
            </HStack>

            <HStack>
              <Label>maxHeight:</Label>
              <InputGroup inside style={{ width: 130 }}>
                <Input size="sm" onChange={setMaxHeight} value={maxHeight} />
                <InputGroup.Addon>px</InputGroup.Addon>
              </InputGroup>
            </HStack>
          </HStack>
        </VStack>
      </VStack>

      <hr />

      <Table
        cellBordered
        autoHeight={autoHeight}
        height={parseInt(height)}
        minHeight={parseInt(minHeight)}
        maxHeight={parseInt(maxHeight)}
        data={data}
      >
        {columns.map(column => {
          const { key, label, ...rest } = column;
          return (
            <Column {...rest} key={key}>
              <HeaderCell>{label}</HeaderCell>
              <Cell dataKey={key} />
            </Column>
          );
        })}
      </Table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

const Label = ({ children }) => <div style={{ width: 76 }}>{children}</div>;
```

<!--end-code-->
