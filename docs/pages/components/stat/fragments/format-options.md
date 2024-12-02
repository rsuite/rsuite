<!--start-code-->

```js
import { Stat } from 'rsuite';

const App = () => (
  <HStack spacing={100}>
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
      <Stat.Label> Speed </Stat.Label>
      <Stat.Value
        value={120}
        formatOptions={{
          style: 'unit',
          unit: 'kilometer-per-hour'
        }}
      />
    </Stat>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
