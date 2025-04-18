<!--start-code-->

```js
import { NumberInput, VStack, Text } from 'rsuite';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

const App = () => (
  <VStack>
    <Text>Hide controls</Text>
    <NumberInput w={200} controls={false} />

    <Text>Custom controls</Text>
    <NumberInput
      w={200}
      controls={trigger => (trigger === 'up' ? <FaCaretUp /> : <FaCaretDown />)}
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
