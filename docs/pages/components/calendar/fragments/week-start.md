<!--start-code-->

```js
import { Calendar, RadioGroup, Radio, Form, Toggle } from 'rsuite';

const App = () => {
  const [weekStart, setWeekStart] = React.useState(0);
  const [isoWeek, setIsoWeek] = React.useState(false);
  const [showWeekNumbers, setShowWeekNumbers] = React.useState(true);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 280, padding: '0 10px' }}>
        <Calendar
          bordered
          compact
          weekStart={weekStart}
          showWeekNumbers={showWeekNumbers}
          isoWeek={isoWeek}
        />
      </div>
      <div style={{ borderLeft: '1px solid var(--rs-border-primary)', padding: '0 20px' }}>
        <Form>
          <Form.Group>
            <RadioGroup
              value={weekStart}
              onChange={value => {
                setWeekStart(value);
                setIsoWeek(false);
              }}
              inline
              appearance="picker"
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
          </Form.Group>

          <Form.Group>
            <Toggle checked={isoWeek} onChange={setIsoWeek}>
              ISO week
            </Toggle>
          </Form.Group>

          <Form.Group>
            <Toggle checked={showWeekNumbers} onChange={setShowWeekNumbers}>
              Show week numbers
            </Toggle>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
