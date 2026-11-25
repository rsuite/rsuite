<!--start-code-->

```js
import { DatePicker, VStack, HStack, Text, Divider } from 'rsuite';
import { isBefore } from 'date-fns/isBefore';

const Field = ({ label, children, ...rest }) => (
  <HStack>
    <Text muted w={120}>
      {label}
    </Text>
    <DatePicker {...rest} w={180} />
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <VStack>
      <Field label="Disabled" disabled />
      <Field
        label="Disabled date"
        defaultValue={new Date()}
        shouldDisableDate={date => isBefore(date, new Date())}
      />
      <Field
        label="Disabled month"
        shouldDisableDate={date => {
          const month = date.getMonth();
          return month === 0 || month === 11;
        }}
        format="yyyy-MM"
      />
      <Field
        label="Disabled time"
        format="HH:mm:ss"
        ranges={[]}
        defaultValue={new Date('2017-12-12 09:15:30')}
        shouldDisableHour={hour => hour < 8 || hour > 18}
        shouldDisableMinute={minute => minute % 15 !== 0}
        shouldDisableSecond={second => second % 30 !== 0}
      />
      <Field
        label="Hidden time"
        format="HH:mm:ss"
        ranges={[]}
        defaultValue={new Date('2017-12-12 09:15:30')}
        hideHours={hour => hour < 8 || hour > 18}
        hideMinutes={minute => minute % 15 !== 0}
        hideSeconds={second => second % 30 !== 0}
      />
    </VStack>
    <Field label="Read only" readOnly defaultValue={new Date()} />
    <Field label="Plaintext" plaintext defaultValue={new Date()} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
