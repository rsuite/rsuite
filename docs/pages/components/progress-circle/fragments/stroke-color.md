<!--start-code-->

```js
import { ProgressCircle, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <ProgressCircle percent={30} strokeColor="#ffc107" w={100} />
    <ProgressCircle percent={50} strokeColor="#4caf50" w={100} />
    <ProgressCircle percent={70} strokeColor="#000" w={100} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
