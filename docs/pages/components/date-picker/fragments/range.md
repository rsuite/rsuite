<!--start-code-->

```js
import { DatePicker, InputGroup } from 'rsuite';

const App = () => (
  <InputGroup style={{ width: 428 }}>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" style={{ width: 230 }} />
    <InputGroup.Addon>to</InputGroup.Addon>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" style={{ width: 230 }} />
  </InputGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
