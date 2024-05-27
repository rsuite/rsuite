<!--start-code-->

```js
import { Toggle, Stack } from 'rsuite';

const App = () => (
  <Stack spacing={10} childrenRenderMode="clone">
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
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
