<!--start-code-->

```js
import { Stat, HStack } from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import FunnelStepsIcon from '@rsuite/icons/FunnelSteps';

const App = () => (
  <HStack spacing={20}>
    <Stat
      bordered
      icon={<PeoplesIcon color="blue" style={{ fontSize: 30 }} />}
      style={{ width: 200 }}
    >
      <Stat.Value>21,000</Stat.Value>
      <Stat.Label>Active Users</Stat.Label>
    </Stat>

    <Stat
      bordered
      icon={<FunnelStepsIcon color="blue" style={{ fontSize: 30 }} />}
      style={{ width: 200 }}
    >
      <Stat.Value>5.2%</Stat.Value>
      <Stat.Label>Conversion Rate</Stat.Label>
    </Stat>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
