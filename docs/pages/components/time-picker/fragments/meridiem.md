<!--start-code-->

```js
import { TimePicker, HStack, VStack, Text } from 'rsuite';

const App = () => (
  <VStack>
    <HStack>
      <Text muted w={80}>
        24 hours
      </Text>
      <TimePicker format="HH:mm" />
    </HStack>

    <HStack>
      <Text muted w={80}>
        12 hours
      </Text>
      <TimePicker format="hh:mm aa" showMeridiem />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
