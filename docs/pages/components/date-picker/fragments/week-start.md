<!--start-code-->

```js
import { DatePicker, RadioGroup, Radio } from 'rsuite';

const App = () => {
  const [weekStart, setWeekStart] = React.useState(0);
  return (
    <>
      <RadioGroup
        inline
        appearance="picker"
        value={weekStart}
        onChange={value => {
          setWeekStart(value);
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
      <hr />
      <DatePicker weekStart={weekStart} style={{ width: 200 }} />
    </>
  );
};

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
