<!--start-code-->

```js
import { AutoComplete, VStack } from 'rsuite';

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
  <VStack spacing={10} style={{ width: 224 }}>
    <AutoComplete size="lg" placeholder="Large" data={data} />
    <AutoComplete size="md" placeholder="Medium" data={data} />
    <AutoComplete size="sm" placeholder="Small" data={data} />
    <AutoComplete size="xs" placeholder="Xsmall" data={data} />
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
