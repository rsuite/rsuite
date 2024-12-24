<!--start-code-->

```js
import { DatePicker, Stack } from 'rsuite';
import { addDays } from 'date-fns/addDays';
import { subDays } from 'date-fns/subDays';

const predefinedBottomRanges = [
  {
    label: 'today',
    value: new Date()
  },
  {
    label: 'Prev Day',
    closeOverlay: false,
    value: date => {
      return subDays(date, 1);
    }
  }
];

const predefinedRanges = [
  {
    label: 'yesterday',
    value: addDays(new Date(), -1),
    placement: 'left'
  },
  {
    label: 'today',
    value: new Date(),
    placement: 'left'
  },
  {
    label: 'Prev Day',
    closeOverlay: false,
    value: date => {
      return subDays(date, 1);
    }
  }
];

const App = () => (
  <Stack direction="column" spacing={8} alignItems="flex-start">
    <DatePicker
      ranges={predefinedBottomRanges}
      placeholder="Placement defaults to bottom"
      style={{ width: 300 }}
      onShortcutClick={(shortcut, event) => {
        console.log(shortcut);
      }}
    />
    <DatePicker
      ranges={predefinedRanges}
      placeholder="Placement mixed"
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
