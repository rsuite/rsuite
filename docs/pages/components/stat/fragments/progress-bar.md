<!--start-code-->

```js
import { Stat, Progress, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Stat bordered style={{ width: 200 }}>
      <Stat.Label>Processing</Stat.Label>
      <Stat.Value>1,200</Stat.Value>
      <Progress.Line percent={50} showInfo={false} />
    </Stat>

    <Stat bordered style={{ width: 200 }}>
      <Stat.Label>Pending</Stat.Label>
      <Stat.Value>100</Stat.Value>
      <Progress.Line percent={10} showInfo={false} strokeColor="#ffc107" />
    </Stat>

    <Stat bordered style={{ width: 200 }}>
      <Stat.Label>Completed</Stat.Label>
      <Stat.Value>1,000</Stat.Value>
      <Progress.Line percent={45} showInfo={false} status="success" />
    </Stat>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
