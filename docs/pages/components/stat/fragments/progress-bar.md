<!--start-code-->

```js
import { Stat, Progress } from 'rsuite';

const App = () => (
  <Stat bordered style={{ width: 200 }}>
    <Stat.Label>Processing</Stat.Label>
    <Stat.Value>1,200</Stat.Value>
    <Progress.Line percent={30} showInfo={false} />
  </Stat>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
