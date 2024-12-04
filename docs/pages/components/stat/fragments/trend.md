<!--start-code-->

```js
import { Stat, StatGroup } from 'rsuite';

const App = () => (
  <StatGroup>
    <Stat>
      <Stat.Label>Profits</Stat.Label>
      <HStack spacing={10}>
        <Stat.Value>38,050</Stat.Value>
        <Stat.Trend>10%</Stat.Trend>
      </HStack>
    </Stat>

    <Stat>
      <Stat.Label>Revenue</Stat.Label>
      <HStack spacing={10}>
        <Stat.Value>4,635</Stat.Value>
        <Stat.Trend indicator="down">5%</Stat.Trend>
      </HStack>
    </Stat>

    <Stat>
      <Stat.Label>Cost</Stat.Label>
      <HStack spacing={10}>
        <Stat.Value>2,800</Stat.Value>
        <Stat.Trend appearance="subtle">10%</Stat.Trend>
      </HStack>
    </Stat>

    <Stat>
      <Stat.Label> Expenses</Stat.Label>
      <HStack spacing={10}>
        <Stat.Value>1,130</Stat.Value>
        <Stat.Trend appearance="subtle">3%</Stat.Trend>
      </HStack>
    </Stat>
  </StatGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
