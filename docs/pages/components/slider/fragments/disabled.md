<!--start-code-->

```js
import { Slider, VStack } from 'rsuite';

const App = () => (
  <>
    <VStack>
      <label>Disabled: </label>
      <Slider disabled defaultValue={50} progress w={'100%'} />
    </VStack>
    <hr />
    <VStack>
      <label>Read only: </label>
      <Slider readOnly defaultValue={50} progress w={'100%'} />
    </VStack>
    <hr />
    <VStack>
      <label>Plaintext: </label>
      <Slider plaintext defaultValue={50} progress w={'100%'} />
    </VStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
