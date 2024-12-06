<!--start-code-->

```js
import { Stat, StatGroup, SelectPicker, HStack } from 'rsuite';

const App = () => {
  const [columns, setColumns] = React.useState(4);
  const [spacing, setSpacing] = React.useState(20);

  return (
    <>
      <StatGroup columns={columns} spacing={spacing}>
        <Stat bordered>
          <Stat.Label>Profits</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>38,050</Stat.Value>
            <Stat.Trend>10%</Stat.Trend>
          </HStack>
        </Stat>

        <Stat bordered>
          <Stat.Label>Revenue</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>4,635</Stat.Value>
            <Stat.Trend indicator="down">5%</Stat.Trend>
          </HStack>
        </Stat>

        <Stat bordered>
          <Stat.Label>Cost</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>2,800</Stat.Value>
            <Stat.Trend>10%</Stat.Trend>
          </HStack>
        </Stat>

        <Stat bordered>
          <Stat.Label> Expenses</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>1,130</Stat.Value>
            <Stat.Trend>3%</Stat.Trend>
          </HStack>
        </Stat>
      </StatGroup>
      <hr />
      <HStack>
        <SelectPicker
          data={[1, 2, 4].map(value => ({ label: `${value} Columns`, value }))}
          value={columns}
          onChange={setColumns}
          cleanable={false}
        />
        <SelectPicker
          label="Spacing"
          data={[10, 20, 30, 40, 50].map(value => ({ label: `${value}px`, value }))}
          value={spacing}
          onChange={setSpacing}
          cleanable={false}
        />
      </HStack>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
