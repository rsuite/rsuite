<!--start-code-->

```js
import { DateInput, InputGroup, Stack } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <label>Disabled:</label>
    <DateInput disabled value={new Date()} />
    <InputGroup disabled>
      <DateInput value={new Date()} />
      <InputGroup.Addon>
        <CalendarIcon />
      </InputGroup.Addon>
    </InputGroup>

    <label>Read only:</label>
    <DateInput readOnly value={new Date()} />

    <label>Plaintext:</label>
    <DateInput plaintext value={new Date()} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
