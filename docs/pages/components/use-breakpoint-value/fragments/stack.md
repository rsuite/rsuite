<!--start-code-->

```js
import { useBreakpointValue, Stack, Button } from 'rsuite';

const App = () => {
  const direction = useBreakpointValue(
    {
      '(min-width: 992px)': 'row'
    },
    { defaultValue: 'column' }
  );

  return (
    <>
      <p>
        Resize your window to see stack direction change. Current direction: <b>{direction}</b>
      </p>
      <hr />
      <Stack direction={direction} spacing={10}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Stack>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
