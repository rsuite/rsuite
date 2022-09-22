<!--start-code-->

```js
import { Stack, Button } from 'rsuite';

const App = () => {
  return (
    <Stack alignItems="flex-start" spacing={10}>
      <Button size="lg">Item 1</Button>
      <Button size="md">Item 2</Button>
      <Button size="sm">Item 3</Button>
      <Stack.Item alignSelf="flex-end">
        <Button size="xs">Item 4</Button>
      </Stack.Item>
      <Stack.Item grow={1}>
        <Button size="md" block>
          Item 5
        </Button>
      </Stack.Item>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
