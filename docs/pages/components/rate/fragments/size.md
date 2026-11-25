<!--start-code-->

```js
import { Rate, VStack, Divider } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <Divider label="Preset sizes" labelPlacement="start" />
    <VStack>
      <Rate defaultValue={3} size="xs" />
      <Rate defaultValue={3} size="sm" />
      <Rate defaultValue={3} size="md" />
      <Rate defaultValue={3} size="lg" />
      <Rate defaultValue={3} size="xl" />
    </VStack>
    <Divider label="Custom size" labelPlacement="start" />
    <VStack>
      <Rate defaultValue={3} size={12} />
      <Rate defaultValue={3} size="2rem" />
    </VStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
