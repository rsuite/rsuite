<!--start-code-->

```js
import { Stat, StatGroup } from 'rsuite';

const App = () => (
  <StatGroup spacing={20}>
    <Stat>
      <Stat.Label>Profits</Stat.Label>
      <Stat.Value
        value={38050}
        formatOptions={{
          style: 'currency',
          currency: 'USD'
        }}
      />
    </Stat>

    <Stat>
      <Stat.Label>Speed</Stat.Label>
      <Stat.Value
        value={120}
        formatOptions={{
          style: 'unit',
          unit: 'kilometer-per-hour'
        }}
      />
    </Stat>
  </StatGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
