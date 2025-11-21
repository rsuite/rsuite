<!--start-code-->

```js
import { SegmentedControl, HStack } from 'rsuite';
import { BsViewList, BsCalendar, BsCalendar3 } from 'react-icons/bs';

const data = [
  {
    label: (
      <HStack>
        <BsViewList />
        <span>Day</span>
      </HStack>
    ),
    value: 'day'
  },
  {
    label: (
      <HStack>
        <BsCalendar />
        <span>Week</span>
      </HStack>
    ),
    value: 'week'
  },
  {
    label: (
      <HStack>
        <BsCalendar3 />
        <span>Month</span>
      </HStack>
    ),
    value: 'month'
  }
];

const App = () => {
  return <SegmentedControl defaultValue="day" data={data} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
