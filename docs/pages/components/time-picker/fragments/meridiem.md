<!--start-code-->

```js
import { TimePicker, Stack } from 'rsuite';

const App = () => (
  <>
    <Row title="24 hours">
      <TimePicker format="HH:mm" />
    </Row>

    <Row title="12 hours">
      <TimePicker format="hh:mm aa" showMeridiem />
    </Row>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));

const Row = ({ children, title }) => {
  return (
    <div>
      <label style={{ width: 80, display: 'inline-block', marginTop: 10 }}>{title}</label>
      {children}
    </div>
  );
};
```

<!--end-code-->
