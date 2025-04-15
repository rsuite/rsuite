<!--start-code-->

```js
import { Textarea, Text, VStack } from 'rsuite';

const App = () => (
  <VStack>
    <Text>Disabled</Text>
    <Textarea placeholder="Default Textarea" disabled />
    <Text>ReadOnly</Text>
    <Textarea placeholder="Default Textarea" readOnly />
    <Text>Plaintext</Text>
    <Textarea placeholder="Default Textarea" plaintext />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
