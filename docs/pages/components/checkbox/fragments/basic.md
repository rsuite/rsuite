<!--start-code-->

```js
import { Checkbox, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Checkbox />
    <Checkbox>Label</Checkbox>
    <Checkbox defaultChecked>Checked</Checkbox>
  </HStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
