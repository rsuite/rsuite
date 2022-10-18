<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
      <SelectPicker data={data} loading />
      <SelectPicker data={data} loading style={{ width: 200 }} />
    </div>
    <div style={{ display: 'flex', gap: 10 }}>
      <SelectPicker label="User" data={data} loading />
      <SelectPicker label="User" data={data} loading style={{ width: 200 }} />
    </div>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
