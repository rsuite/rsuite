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
  <VStack spacing={10}>
    <AutoComplete size="lg" placeholder="Large" data={data} w={224} />
    <AutoComplete size="md" placeholder="Medium" data={data} w={224} />
    <AutoComplete size="sm" placeholder="Small" data={data} w={224} />
    <AutoComplete size="xs" placeholder="Xsmall" data={data} w={224} />
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
