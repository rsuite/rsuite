<!--start-code-->

```js
import { ProgressCircle, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <ProgressCircle percent={30} status="active" w={100} />
    <ProgressCircle percent={30} status="success" w={100} />
    <ProgressCircle percent={30} status="fail" w={100} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
