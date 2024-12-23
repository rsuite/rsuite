<!--start-code-->

```js
import { TimePicker } from 'rsuite';
import { isBefore } from 'date-fns/isBefore';

const App = () => (
  <div>
    <Row title="Disabled">
      <TimePicker disabled />
    </Row>

    <Row title="Disabled time">
      <TimePicker
        defaultValue={new Date('2017-12-12 09:15:30')}
        shouldDisableHour={hour => hour < 8 || hour > 18}
        shouldDisableMinute={minute => minute % 15 !== 0}
        shouldDisableSecond={second => second % 30 !== 0}
      />
    </Row>

    <Row title="Hidden time">
      <TimePicker
        format="HH:mm:ss"
        defaultValue={new Date('2017-12-12 09:15:30')}
        hideHours={hour => hour < 8 || hour > 18}
        hideMinutes={minute => minute % 15 !== 0}
        hideSeconds={second => second % 30 !== 0}
      />
    </Row>

    <hr />

    <Row title="Read only">
      <TimePicker readOnly defaultValue={new Date()} />
    </Row>

    <hr />

    <Row title="Plaintext">
      <TimePicker plaintext defaultValue={new Date()} />
    </Row>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Row = ({ children, title }) => {
  return (
    <div>
      <label style={{ width: 120, display: 'inline-block', marginTop: 10 }}>{title}</label>
      {children}
    </div>
  );
};
```

<!--end-code-->
