<!--start-code-->

```js
import { Calendar, SegmentedControl, Toggle, VStack, HStack, Divider } from 'rsuite';

const options = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' }
];

const App = () => {
  const [weekStart, setWeekStart] = React.useState(0);
  const [isoWeek, setIsoWeek] = React.useState(false);
  const [showWeekNumbers, setShowWeekNumbers] = React.useState(true);
  return (
    <HStack wrap divider={<Divider vertical />} spacing={10} h={320}>
      <Calendar
        compact
        weekStart={weekStart}
        showWeekNumbers={showWeekNumbers}
        isoWeek={isoWeek}
        w={320}
      />

      <VStack spacing={20}>
        <SegmentedControl data={options} value={weekStart} onChange={setWeekStart} />
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

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
