<!--start-code-->

```js
import { VStack, HStack, Slider, Button } from 'rsuite';

const App = () => {
  const [spacing, setSpacing] = React.useState(6);

  return (
    <VStack spacing={20}>
      <HStack>
        Spacing:
        <Slider value={spacing} style={{ width: 300 }} onChange={setSpacing} />
      </HStack>
      <Stack spacing={spacing}>
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
        <Button>Item 4</Button>
      </Stack>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
