<!--start-code-->

```js
import { Textarea, Divider, VStack } from 'rsuite';

const App = () => (
  <VStack>
    <Divider label="autosize" labelPlacement="start" />
    <Textarea placeholder="Default Textarea" autosize />
    <Divider label="minRows=3, maxRows=5" labelPlacement="start" />
    <Textarea placeholder="Default Textarea" autosize minRows={3} maxRows={5} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
