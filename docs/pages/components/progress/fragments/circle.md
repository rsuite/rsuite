<!--start-code-->

```js
import { Progress, HStack, Box } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Box w={120}>
      <Progress.Circle />
    </Box>
    <Box w={120}>
      <Progress.Circle percent={30} strokeColor="#ffc107" />
    </Box>
    <Box w={120}>
      <Progress.Circle percent={100} status="success" />
    </Box>
    <Box w={120}>
      <Progress.Circle percent={30} status="fail" />
    </Box>
    <Box w={120}>
      <Progress.Circle percent={30} showInfo={false} />
    </Box>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
