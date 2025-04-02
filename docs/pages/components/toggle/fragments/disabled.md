<!--start-code-->

```js
import { Toggle, HStack } from 'rsuite';

const App = () => (
  <>
    <HStack spacing={10}>
      <label>Disabled: </label>
      <Toggle disabled />
      <Toggle disabled checkedChildren="Enable" unCheckedChildren="Disabled" />
      <Toggle disabled defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    </HStack>
    <hr />
    <HStack spacing={10}>
      <label>Read only: </label>
      <Toggle readOnly />
      <Toggle readOnly checkedChildren="Enable" unCheckedChildren="Disabled" />
      <Toggle readOnly defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    </Stack>
    <hr />
    <HStack spacing={10}>
      <label>Plaintext: </label>
      <Toggle plaintext />
      <Toggle plaintext checkedChildren="Enable" unCheckedChildren="Disabled" />
      <Toggle plaintext defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
