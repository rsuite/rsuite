<!--start-code-->

```js
import { DatePicker, InputGroup } from 'rsuite';

const App = () => (
  <InputGroup w={496}>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" w={230} />
    <InputGroup.Addon>to</InputGroup.Addon>
    <DatePicker format="yyyy-MM-dd HH:mm:ss" block appearance="subtle" w={230} />
  </InputGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
