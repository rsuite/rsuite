<!--start-code-->

```js
import { Stat, HStack } from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';

const App = () => (
  <Stat
    bordered
    icon={<PeoplesIcon color="#3498FF" style={{ fontSize: 30 }} />}
    style={{ width: 200 }}
  >
    <Stat.Value>21,000</Stat.Value>
    <Stat.Label>Active Users</Stat.Label>
  </Stat>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
