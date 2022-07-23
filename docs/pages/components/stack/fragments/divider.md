<!--start-code-->

```js
import { Stack, Button } from 'rsuite';

const App = () => {
  return (
    <Stack divider={<Divider vertical />}>
      <Button>Item 1</Button>
      <Button>Item 2</Button>
      <Button>Item 3</Button>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
