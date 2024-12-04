<!--start-code-->

```js
import { Stat, StatGroup, HStack, useBreakpointValue } from 'rsuite';

const App = () => {
  const columns = useBreakpointValue(
    {
      '(min-width: 1200px)': 4,
      '(min-width: 992px)': 2,
      '(min-width: 768px)': 1
    },
    { defaultValue: 1 }
  );

  return (
    <StatGroup columns={columns} spacing={20}>
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
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
