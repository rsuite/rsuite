<!--start-code-->

```js
import { useMediaQuery, Stack, Button } from 'rsuite';

const App = () => {
  const [isMobile] = useMediaQuery('(max-width: 700px)');
  return (
    <Stack direction={isMobile ? 'column' : 'row'} spacing={10}>
      <Button>Item 1</Button>
      <Button>Item 2</Button>
      <Button>Item 3</Button>
      <Button>Item 4</Button>
      <Button>Item 5</Button>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
