<!--start-code-->

```js
import { Stat } from 'rsuite';

const App = () => (
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
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
