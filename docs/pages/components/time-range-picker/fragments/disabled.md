<!--start-code-->

```js
import { TimeRangePicker, HStack, VStack, Text, Divider } from 'rsuite';

const App = () => (
  <VStack divider={<Divider />}>
    <VStack>
      <HStack>
        <Text muted w={120}>
          Disabled
        </Text>
        <TimeRangePicker disabled />
      </HStack>

      <HStack>
        <Text muted w={120}>
          Disabled time
        </Text>
        <TimeRangePicker
          defaultValue={[new Date('2017-12-12 09:15:30'), new Date('2017-12-12 09:15:30')]}
          shouldDisableHour={hour => hour < 8 || hour > 18}
          shouldDisableMinute={minute => minute % 15 !== 0}
          shouldDisableSecond={second => second % 30 !== 0}
        />
      </HStack>

      <HStack>
        <Text muted w={120}>
          Hidden time
        </Text>
        <TimeRangePicker
          format="HH:mm:ss"
          defaultValue={[new Date('2017-12-12 09:15:30'), new Date('2017-12-12 09:15:30')]}
          hideHours={hour => hour < 8 || hour > 18}
          hideMinutes={minute => minute % 15 !== 0}
          hideSeconds={second => second % 30 !== 0}
        />
      </HStack>
    </VStack>

    <HStack>
      <Text muted w={120}>
        ReadOnly
      </Text>
      <TimeRangePicker readOnly defaultValue={[new Date(), new Date()]} />
    </HStack>

    <HStack>
      <Text muted w={120}>
        Plaintext
      </Text>
      <TimeRangePicker plaintext defaultValue={[new Date(), new Date()]} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
