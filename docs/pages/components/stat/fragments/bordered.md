<!--start-code-->

```js
import { Stat } from 'rsuite';

const App = () => (
  <Stat bordered style={{ width: 200 }}>
    <Stat.Label>Page Views</Stat.Label>
    <Stat.Value>4,394</Stat.Value>
    <Stat.HelpText>Last 7 Days</Stat.HelpText>
  </Stat>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
