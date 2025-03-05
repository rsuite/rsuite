<!--start-code-->

```js
import { Radio, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Radio> Radio</Radio>
    <Radio checked> Checked Radio</Radio>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
