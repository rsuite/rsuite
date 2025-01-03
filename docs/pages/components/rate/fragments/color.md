<!--start-code-->

```js
import { Rate, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    {/* Preset theme colors */}
    <VStack>
      <Rate defaultValue={5} color="red" />
      <Rate defaultValue={4} color="orange" />
      <Rate defaultValue={3} color="yellow" />
      <Rate defaultValue={2} color="green" />
      <Rate defaultValue={3} color="cyan" />
      <Rate defaultValue={4} color="blue" />
      <Rate defaultValue={5} color="violet" />
    </VStack>

    <p>Custom colors</p>

    <VStack>
      <Rate defaultValue={3} color="#FF0000" />
      <Rate defaultValue={3} color="rgb(51, 204, 108)" />
      <Rate defaultValue={3} color="#8A2BE2" />
    </VStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
