<!--start-code-->

```js
import { Toggle, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={10} wrap>
    <Toggle defaultChecked color="red">
      Red
    </Toggle>
    <Toggle defaultChecked color="orange">
      Orange
    </Toggle>
    <Toggle defaultChecked color="yellow">
      Yellow
    </Toggle>
    <Toggle defaultChecked color="green">
      Green
    </Toggle>
    <Toggle defaultChecked color="cyan">
      Cyan
    </Toggle>
    <Toggle defaultChecked color="blue">
      Blue
    </Toggle>
    <Toggle defaultChecked color="violet">
      Violet
    </Toggle>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
