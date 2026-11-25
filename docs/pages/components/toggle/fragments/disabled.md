<!--start-code-->

```js
import { Toggle, HStack, Divider, Text, VStack } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />}>
    <HStack align="start">
      <Text muted w={80}>
        Disabled
      </Text>
      <Toggle disabled />
      <Toggle disabled checkedChildren="ON" unCheckedChildren="OFF" />
      <Toggle disabled defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
    </HStack>
    <HStack align="start">
      <Text muted w={80}>
        ReadOnly
      </Text>
      <Toggle readOnly />
      <Toggle readOnly checkedChildren="ON" unCheckedChildren="OFF" />
      <Toggle readOnly defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
    </HStack>
    <HStack align="start">
      <Text muted w={80}>
        Plaintext
      </Text>
      <Toggle plaintext />
      <Toggle plaintext checkedChildren="ON" unCheckedChildren="OFF" />
      <Toggle plaintext defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
