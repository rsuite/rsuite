<!--start-code-->

```js
import { Table, Checkbox, Input, HStack, Divider } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(50);

const App = () => {
  const [height, setHeight] = React.useState(30);
  const [fillHeight, setFillHeight] = React.useState(false);

  return (
    <div>
      <HStack spacing={10} divider={<Divider vertical />}>
        <Checkbox
          checked={fillHeight}
          onChange={(_v, checked) => {
            setFillHeight(checked);
          }}
        >
          fillHeight
        </Checkbox>

        <HStack>
          <span>Container height:</span>
          <Input
            size="sm"
            style={{ width: 100, display: 'inline-block' }}
            onChange={setHeight}
            value={height}
          />{' '}
          rem
        </HStack>
      </HStack>
      <hr />
      <FakeBrowser style={{ height: `${height}rem` }}>
        <Table height={400} fillHeight={fillHeight} data={data} bordered>
          <Column width={70} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
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
      </FakeBrowser>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
