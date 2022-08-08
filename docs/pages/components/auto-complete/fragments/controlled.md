<!--start-code-->

```js
import { AutoComplete } from 'rsuite';

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

const App = () => {
  const [value, setValue] = React.useState('');
  return <AutoComplete data={data} value={value} onChange={setValue} style={{ width: 224 }} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
