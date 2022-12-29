<!--start-code-->

```js
import { AutoComplete, Stack } from 'rsuite';

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
];

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={4}>
    <AutoComplete size="lg" placeholder="Large" data={data} style={{ width: 224 }} />
    <AutoComplete size="md" placeholder="Medium" data={data} style={{ width: 224 }} />
    <AutoComplete size="sm" placeholder="Small" data={data} style={{ width: 224 }} />
    <AutoComplete size="xs" placeholder="Xsmall" data={data} style={{ width: 224 }} />
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
