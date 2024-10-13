<!--start-code-->

```js
import { Calendar, RadioGroup, Radio, Toggle, VStack, HStack, Divider } from 'rsuite';

const App = () => {
  const [weekStart, setWeekStart] = React.useState(0);
  const [isoWeek, setIsoWeek] = React.useState(false);
  const [showWeekNumbers, setShowWeekNumbers] = React.useState(true);
  return (
    <HStack wrap divider={<Divider vertical />} spacing={10} style={{ height: 320 }}>
      <Calendar
        compact
        weekStart={weekStart}
        showWeekNumbers={showWeekNumbers}
        isoWeek={isoWeek}
        style={{ width: 320 }}
      />

      <VStack spacing={20}>
        <RadioGroup
          inline
          appearance="picker"
          value={weekStart}
          onChange={value => {
            setWeekStart(value);
            setIsoWeek(false);
          }}
        >
          <RadioLabel>Week start</RadioLabel>
          <Radio value={0}>Sun</Radio>
          <Radio value={1}>Mon</Radio>
          <Radio value={2}>Tue</Radio>
          <Radio value={3}>Wed</Radio>
          <Radio value={4}>Thu</Radio>
          <Radio value={5}>Fri</Radio>
          <Radio value={6}>Sat</Radio>
        </RadioGroup>

        <Toggle checked={isoWeek} onChange={setIsoWeek}>
          ISO week
        </Toggle>

        <Toggle checked={showWeekNumbers} onChange={setShowWeekNumbers}>
          Show week numbers
        </Toggle>
      </VStack>
    </HStack>
  );
};

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
