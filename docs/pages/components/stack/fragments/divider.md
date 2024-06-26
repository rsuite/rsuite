<!--start-code-->

```js
import { HStack, VStack, Button, Divider } from 'rsuite';

const App = () => {
  return (
    <VStack divider={<Divider />}>
      <Button>Item 1</Button>
      <HStack divider={<Divider vertical />} style={{ height: 40 }}>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
        <Button>Item 4</Button>
      </HStack>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
