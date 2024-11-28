<!--start-code-->

```js
import { Stat, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={100}>
    <Stat>
      <Stat.Label>Profits</Stat.Label>
      <HStack>
        <Stat.Value>38,050</Stat.Value>
        <Stat.Trend>10%</Stat.Trend>
      </HStack>
    </Stat>

    <Stat>
      <Stat.Label>Revenue</Stat.Label>
      <HStack>
        <Stat.Value>4,635</Stat.Value>
        <Stat.Trend indicator="down">5%</Stat.Trend>
      </HStack>
    </Stat>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
