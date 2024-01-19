<!--start-code-->

```js
import { CheckPicker, Stack } from 'rsuite';

const data = [
  'Eugenia',
  'Bryan',
  'Linda',
  'Nancy',
  'Lloyd',
  'Alice',
  'Julia',
  'Albert',
  'Louisa',
  'Lester',
  'Lola',
  'Lydia',
  'Hal',
  'Hannah',
  'Harriet',
  'Hattie',
  'Hazel',
  'Hilda'
].map(item => ({ label: item, value: item }));

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <CheckPicker data={data} style={{ width: 224 }} />
    <CheckPicker
      data={data}
      searchable={false}
      style={{ width: 224 }}
      placeholder="Select without search"
    />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
