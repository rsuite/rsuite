<!--start-code-->

```js
import { Toggle, Stack } from 'rsuite';

const App = () => (
  <>
    <Stack spacing={10} childrenRenderMode="clone">
      <label>Disabled: </label>
      <Toggle disabled />
      <Toggle disabled checkedChildren="Enable" unCheckedChildren="Disabled" />
      <Toggle disabled defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    </Stack>
    <hr />
    <Stack spacing={10} childrenRenderMode="clone">
      <label>Read only: </label>
      <Toggle readOnly />
      <Toggle readOnly checkedChildren="Enable" unCheckedChildren="Disabled" />
      <Toggle readOnly defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    </Stack>
    <hr />
    <Stack spacing={10} childrenRenderMode="clone">
      <label>Plaintext: </label>
      <Toggle plaintext />
      <Toggle plaintext checkedChildren="Enable" unCheckedChildren="Disabled" />
      <Toggle plaintext defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    </Stack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
