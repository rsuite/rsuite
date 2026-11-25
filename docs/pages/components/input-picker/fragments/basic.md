<!--start-code-->

```js
import { InputPicker } from 'rsuite';

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
  <>
    <InputPicker data={data} w={224} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
