<!--start-code-->

```js
import { TimeRangePicker, HStack, VStack, Text } from 'rsuite';

const App = () => (
  <VStack>
    <HStack>
      <Text muted w={80}>
        24 hours
      </Text>
      <TimeRangePicker format="HH:mm" />
    </HStack>

    <HStack>
      <Text muted w={80}>
        12 hours
      </Text>
      <TimeRangePicker format="hh:mm aa" showMeridiem />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
