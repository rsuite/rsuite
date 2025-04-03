<!--start-code-->

```js
import { Center, HStack } from 'rsuite';
import { MdEmail } from 'react-icons/md';

const App = () => (
  <HStack spacing={10}>
    <Center h={40} w={40} bg="green.600" c="white">
      <MdEmail size={20} />
    </Center>

    <Center h={40} w={40} bg="blue.600" c="white" rounded="lg">
      <MdEmail size={20} />
    </Center>

    <Center h={40} w={40} bg="red.600" c="white" rounded="full">
      <MdEmail size={20} />
    </Center>

    <Center h={40} w={40} bg="orange.600" c="white">
      6
    </Center>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
