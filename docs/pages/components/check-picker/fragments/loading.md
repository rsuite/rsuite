<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

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
    <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
      <CheckPicker data={data} loading />
      <CheckPicker data={data} loading style={{ width: 200 }} />
    </div>
    <div style={{ display: 'flex', gap: 10 }}>
      <CheckPicker label="User" data={data} loading />
      <CheckPicker label="User" data={data} loading style={{ width: 200 }} />
    </div>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
