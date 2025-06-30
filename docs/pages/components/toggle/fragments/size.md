<!--start-code-->

```js
import { Toggle, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <Toggle size="xl">Extra Large</Toggle>
    <Toggle size="lg">Large</Toggle>
    <Toggle size="md">Medium</Toggle>
    <Toggle size="sm">Small</Toggle>
    <Toggle size="xs">Extra Small</Toggle>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
