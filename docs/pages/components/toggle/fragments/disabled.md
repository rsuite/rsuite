<!--start-code-->

```js
import { Toggle, HStack } from 'rsuite';

const App = () => (
  <>
    <HStack spacing={10}>
      <label>Disabled: </label>
      <Toggle disabled />
      <Toggle disabled checkedChildren="ON" unCheckedChildren="OFF" />
      <Toggle disabled defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
    </HStack>
    <hr />
    <HStack spacing={10}>
      <label>Read only: </label>
      <Toggle readOnly />
      <Toggle readOnly checkedChildren="ON" unCheckedChildren="OFF" />
      <Toggle readOnly defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
    </HStack>
    <hr />
    <HStack spacing={10}>
      <label>Plaintext: </label>
      <Toggle plaintext />
      <Toggle plaintext checkedChildren="ON" unCheckedChildren="OFF" />
      <Toggle plaintext defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
