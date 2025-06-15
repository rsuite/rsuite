<!--start-code-->

```js
import { Button, VStack, ButtonGroup } from 'rsuite';

const App = () => (
  <VStack>
    <ButtonGroup size="lg">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>

    <ButtonGroup size="md">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>

    <ButtonGroup size="sm">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>

    <ButtonGroup size="xs">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
