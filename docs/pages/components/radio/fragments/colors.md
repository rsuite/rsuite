<!--start-code-->

```js
import { Radio, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Radio checked color="red">
      Red
    </Radio>
    <Radio checked color="orange">
      Orange
    </Radio>
    <Radio checked color="yellow">
      Yellow
    </Radio>
    <Radio checked color="green">
      Green
    </Radio>
    <Radio checked color="cyan">
      Cyan
    </Radio>
    <Radio checked color="blue">
      Blue
    </Radio>
    <Radio checked color="violet">
      Violet
    </Radio>
  </HStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
