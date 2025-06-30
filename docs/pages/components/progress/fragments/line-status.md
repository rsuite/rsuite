<!--start-code-->

```js
import { Progress, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={10}>
    <Text>Active</Text>
    <Progress percent={30} status="active" />

    <Text>Fail</Text>
    <Progress percent={50} status="fail" />

    <Text>Success</Text>
    <Progress percent={100} status="success" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
