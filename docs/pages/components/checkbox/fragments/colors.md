<!--start-code-->

```js
import { Checkbox, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20}>
    <Checkbox defaultChecked color="red">
      Red
    </Checkbox>
    <Checkbox defaultChecked color="orange">
      Orange
    </Checkbox>
    <Checkbox defaultChecked color="yellow">
      Yellow
    </Checkbox>
    <Checkbox defaultChecked color="green">
      Green
    </Checkbox>
    <Checkbox defaultChecked color="cyan">
      Cyan
    </Checkbox>
    <Checkbox defaultChecked color="blue">
      Blue
    </Checkbox>
    <Checkbox defaultChecked color="violet">
      Violet
    </Checkbox>
  </HStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
