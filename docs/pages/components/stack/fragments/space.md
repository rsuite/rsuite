<!--start-code-->

```js
import { VStack, HStack, Slider, Button, Text } from 'rsuite';

const App = () => {
  const [spacing, setSpacing] = React.useState(6);

  return (
    <VStack spacing={20}>
      <HStack wrap>
        <Text muted>Spacing</Text>
        <Slider value={spacing} w={300} onChange={setSpacing} keepTooltipOpen />
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
