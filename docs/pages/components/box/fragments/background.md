<!--start-code-->

```js
import { Box, HStack, VStack } from 'rsuite';

const App = () => (
  <>
    <Box color="blue.600" bg="blue.100" p={20}>
      <VStack>
        <span>bg: blue.100</span>
        <span>color: blue.600</span>
      </VStack>
    </Box>

    <Box color="white" bg="linear-gradient(45deg, #4CAF50, #2196F3)" p={20}>
      <VStack>
        <span>bg: linear-gradient(45deg, #4CAF50, #2196F3)</span>
        <span>color: white</span>
      </VStack>
    </Box>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
