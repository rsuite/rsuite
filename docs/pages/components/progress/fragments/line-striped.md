<!--start-code-->

```js
import { Progress, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <Progress percent={30} striped />
    <Progress percent={30} striped status="active" />
    <Progress percent={50} striped status="success" />
    <Progress percent={50} striped status="fail" />
    <Progress
      percent={70}
      striped
      status="active"
      strokeWidth={20}
      radius={10}
      percentPlacement="insideCenter"
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
