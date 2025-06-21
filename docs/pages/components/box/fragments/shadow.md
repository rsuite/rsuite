<!--start-code-->

```js
import { Box, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Box bd="1px solid var(--rs-border-primary)" p={20} w={200} h={200} shadow="md">
      This is the Box
    </Box>

    <Box
      bd="1px solid var(--rs-border-primary)"
      p={20}
      w={200}
      h={200}
      shadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
    >
      This is the Box
    </Box>
  </HStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
