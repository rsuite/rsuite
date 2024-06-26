<!--start-code-->

```js
import { Stack, Button } from 'rsuite';

const App = () => {
  return (
    <Stack divider={<Divider />} direction="column" alignItems="flex-start">
      <Button>Item 1</Button>
      <Stack divider={<Divider vertical />} style={{ height: 40 }}>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
        <Button>Item 4</Button>
      </Stack>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
