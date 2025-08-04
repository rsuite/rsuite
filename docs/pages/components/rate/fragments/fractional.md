<!--start-code-->

```js
import { Rate, VStack, HStack, Text } from 'rsuite';
import { FaHeart } from 'react-icons/fa';

const App = () => {
  return (
    <VStack>
      <HStack spacing={10}>
        <Rate value={4.32} readOnly color="yellow" />
        <Text>4.32</Text>
      </HStack>
      <HStack spacing={10}>
        <Rate value={3.7} readOnly color="yellow" />
        <Text>3.7</Text>
      </HStack>
      <HStack spacing={10}>
        <Rate value={4.76} vertical readOnly color="yellow" />
        <Text>4.76</Text>
      </HStack>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
