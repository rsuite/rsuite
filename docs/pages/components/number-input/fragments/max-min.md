<!--start-code-->

```js
import { NumberInput, VStack } from 'rsuite';

const App = () => (
  <VStack w={200}>
    <NumberInput defaultValue={10} max={100} min={10} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
