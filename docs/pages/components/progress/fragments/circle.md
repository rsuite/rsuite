<!--start-code-->

```js
import { Progress, HStack } from 'rsuite';

const Box = ({ children }) => <div style={{ width: 120 }}>{children}</div>;

const App = () => (
  <HStack spacing={20}>
    <Box>
      <Progress.Circle />
    </Box>
    <Box>
      <Progress.Circle percent={30} strokeColor="#ffc107" />
    </Box>
    <Box>
      <Progress.Circle percent={100} status="success" />
    </Box>
    <Box>
      <Progress.Circle percent={30} status="fail" />
    </Box>
    <Box>
      <Progress.Circle percent={30} showInfo={false} />
    </Box>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
