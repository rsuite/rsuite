<!--start-code-->

```js
import { Box, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Box bd="1px solid var(--rs-border-primary)" p={20} w={100} h={100}>
      This is the Box
    </Box>

    <Box bd="1px solid var(--rs-border-primary)" rounded="xl" p={20} w={100} h={100}>
      This is the Box
    </Box>
  </HStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
