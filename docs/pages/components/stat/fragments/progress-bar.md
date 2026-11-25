<!--start-code-->

```js
import { Stat, StatGroup, Progress } from 'rsuite';

const App = () => (
  <StatGroup spacing={20} columns={3}>
    <Stat bordered>
      <Stat.Label>Processing</Stat.Label>
      <Stat.Value>1,200</Stat.Value>
      <Progress.Line percent={50} showInfo={false} />
    </Stat>

    <Stat bordered>
      <Stat.Label>Pending</Stat.Label>
      <Stat.Value>100</Stat.Value>
      <Progress.Line percent={10} showInfo={false} strokeColor="#ffc107" />
    </Stat>

    <Stat bordered>
      <Stat.Label>Completed</Stat.Label>
      <Stat.Value>1,000</Stat.Value>
      <Progress.Line percent={45} showInfo={false} strokeColor="#87d068" />
    </Stat>
  </StatGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
