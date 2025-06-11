<!--start-code-->

```js
import { TimePicker, HStack, VStack, Text, Divider } from 'rsuite';
import { isBefore } from 'date-fns/isBefore';

const App = () => (
  <VStack divider={<Divider />}>
    <VStack>
      <HStack>
        <Text muted w={120}>
          Disabled
        </Text>
        <TimePicker disabled />
      </HStack>

      <HStack>
        <Text muted w={120}>
          Disabled time
        </Text>
        <TimePicker
          defaultValue={new Date('2017-12-12 09:15:30')}
          shouldDisableHour={hour => hour < 8 || hour > 18}
          shouldDisableMinute={minute => minute % 15 !== 0}
          shouldDisableSecond={second => second % 30 !== 0}
        />
      </HStack>

      <HStack>
        <Text muted w={120}>
          Hidden time
        </Text>
        <TimePicker
          format="HH:mm:ss"
          defaultValue={new Date('2017-12-12 09:15:30')}
          hideHours={hour => hour < 8 || hour > 18}
          hideMinutes={minute => minute % 15 !== 0}
          hideSeconds={second => second % 30 !== 0}
        />
      </HStack>
    </VStack>

    <HStack>
      <Text muted w={120}>
        Read only
      </Text>
      <TimePicker readOnly defaultValue={new Date()} />
    </HStack>

    <HStack>
      <Text muted w={120}>
        Plaintext
      </Text>
      <TimePicker plaintext defaultValue={new Date()} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
