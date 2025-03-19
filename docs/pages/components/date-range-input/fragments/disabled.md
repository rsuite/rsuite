<!--start-code-->

```js
import { DateRangeInput, InputGroup, Stack } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';

const App = () => (
  <Stack spacing={10} direction="column" align="flex-start" w={230}>
    <label>Disabled:</label>
    <DateRangeInput disabled value={[new Date('2023-10-01'), new Date('2023-10-31')]} />
    <InputGroup disabled>
      <DateRangeInput value={[new Date('2023-10-01'), new Date('2023-10-31')]} />
      <InputGroup.Addon>
        <CalendarIcon />
      </InputGroup.Addon>
    </InputGroup>

    <label>Read only:</label>
    <DateRangeInput readOnly value={[new Date('2023-10-01'), new Date('2023-10-31')]} />

    <label>Plaintext:</label>
    <DateRangeInput plaintext value={[new Date('2023-10-01'), new Date('2023-10-31')]} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
