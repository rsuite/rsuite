<!--start-code-->

```js
import { Progress, HStack } from 'rsuite';

const App = () => (
  <HStack style={{ height: 300 }} spacing={50}>
    <Progress.Line vertical />
    <Progress.Line vertical percent={30} strokeColor="#ffc107" />
    <Progress.Line vertical percent={30} status="active" />
    <Progress.Line vertical percent={50} status="fail" />
    <Progress.Line vertical percent={100} status="success" />
    <Progress.Line vertical percent={80} showInfo={false} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
