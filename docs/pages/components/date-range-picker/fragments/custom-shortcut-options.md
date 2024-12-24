<!--start-code-->

```js
import { DateRangePicker, Stack } from 'rsuite';
import { subDays } from 'date-fns/subDays';
import { startOfWeek } from 'date-fns/startOfWeek';
import { endOfWeek } from 'date-fns/endOfWeek';
import { addDays } from 'date-fns/addDays';
import { startOfMonth } from 'date-fns/startOfMonth';
import { endOfMonth } from 'date-fns/endOfMonth';
import { addMonths } from 'date-fns/addMonths';

const predefinedRanges = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement: 'left'
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: 'left'
  },
  {
    label: 'This week',
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: 'left'
  },
  {
    label: 'Last 7 days',
    value: [subDays(new Date(), 6), new Date()],
    placement: 'left'
  },
  {
    label: 'Last 30 days',
    value: [subDays(new Date(), 29), new Date()],
    placement: 'left'
  },
  {
    label: 'This month',
    value: [startOfMonth(new Date()), new Date()],
    placement: 'left'
  },
  {
    label: 'Last month',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
    placement: 'left'
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Last year',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
    placement: 'left'
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Last week',
    closeOverlay: false,
    value: value => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
      ];
    },
    appearance: 'default'
  },
  {
    label: 'Next week',
    closeOverlay: false,
    value: value => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
      ];
    },
    appearance: 'default'
  }
];

const predefinedBottomRanges = [
  {
    label: 'Today',
    value: [new Date(), new Date()]
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)]
  },
  {
    label: 'This week',
    value: [startOfWeek(new Date()), endOfWeek(new Date())]
  },
  {
    label: 'Last 7 days',
    value: [subDays(new Date(), 6), new Date()]
  },
  {
    label: 'Last 30 days',
    value: [subDays(new Date(), 29), new Date()]
  },
  {
    label: 'This month',
    value: [startOfMonth(new Date()), new Date()]
  },
  {
    label: 'Last month',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()]
  },
  {
    label: 'Last year',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)]
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()]
  }
];

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <DateRangePicker
      ranges={predefinedBottomRanges}
      placeholder="Placement defaults to bottom"
      style={{ width: 300 }}
      onShortcutClick={(shortcut, event) => {
        console.log(shortcut);
      }}
    />
    <DateRangePicker
      ranges={predefinedRanges}
      placeholder="Placement left"
      style={{ width: 300 }}
      onShortcutClick={(shortcut, event) => {
        console.log(shortcut);
      }}
    />
    <DateRangePicker
      ranges={predefinedRanges}
      showOneCalendar
      placeholder="One calendar"
      style={{ width: 300 }}
      onShortcutClick={(shortcut, event) => {
        console.log(shortcut);
      }}
    />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
