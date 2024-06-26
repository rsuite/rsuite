<!--start-code-->

```js
import { HStack, Button } from 'rsuite';

const App = () => {
  return (
    <HStack>
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">Xsmall</Button>
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
