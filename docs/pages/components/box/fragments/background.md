<!--start-code-->

```js
import { Box, HStack, VStack } from 'rsuite';

const App = () => (
  <>
    <Box c="blue.600" bg="blue.100" p={20}>
      <VStack>
        <span>bg: blue.100</span>
        <span>c: blue.600</span>
      </VStack>
    </Box>

    <Box c="white" bg="linear-gradient(45deg, #4CAF50, #2196F3)" p={20}>
      <VStack>
        <span>bg: linear-gradient(45deg, #4CAF50, #2196F3)</span>
        <span>c: white</span>
      </VStack>
    </Box>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
