<!--start-code-->

```js
import { CheckPicker, VStack } from 'rsuite';

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
  <VStack>
    <CheckPicker data={data} style={{ width: 224 }} />
    <CheckPicker
      data={data}
      searchable={false}
      style={{ width: 224 }}
      placeholder="Select without search"
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
