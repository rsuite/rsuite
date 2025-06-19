<!--start-code-->

```js
import { DateRangePicker, HStack, VStack, Divider, Text } from 'rsuite';
import { isAfter } from 'date-fns/isAfter';

const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday, combine } =
  DateRangePicker;

const Field = ({ label, description, children, ...rest }) => (
  <HStack>
    <Text muted w={120}>
      {label}
    </Text>
    <VStack>
      <Text muted>{description}</Text>
      <DateRangePicker {...rest} w={240} />
    </VStack>
  </HStack>
);

const App = () => (
  <VStack divider={<Divider />}>
    <VStack spacing={12}>
      <Field label="Disabled" disabled />
      <Field description="Custom disabled" shouldDisableDate={date => isAfter(date, new Date())} />
      <Field
        description="Allow maximum selection for 7 days, other dates are disabled."
        shouldDisableDate={allowedMaxDays(7)}
      />
      <Field
        description="Only 7 days allowed, other dates are disabled"
        shouldDisableDate={allowedDays(7)}
      />
      <Field
        description="Only one date range is allowed, other dates are disabled"
        shouldDisableDate={allowedRange('2020-10-01', '2021-10-01')}
      />
      <Field description="Disable dates before today" shouldDisableDate={beforeToday()} />
      <Field description="Disable dates after today" shouldDisableDate={afterToday()} />
      <Field
        description="Combination: Allow maximum selection for 7 days, while disabling dates before today, other dates are disabled"
        shouldDisableDate={combine(allowedMaxDays(7), beforeToday())}
      />
    </VStack>
    <Field label="Read only" readOnly defaultValue={[new Date(), new Date()]} />
    <Field label="Plaintext" plaintext defaultValue={[new Date(), new Date()]} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
