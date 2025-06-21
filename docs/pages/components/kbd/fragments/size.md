<!--start-code-->

```js
import { Kbd, VStack } from 'rsuite';

const App = () => (
  <VStack>
    <Kbd size="lg">Command + K</Kbd>
    <Kbd size="md">Command + K</Kbd>
    <Kbd size="sm">Command + K</Kbd>
    <Kbd size="xs">Command + K</Kbd>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
