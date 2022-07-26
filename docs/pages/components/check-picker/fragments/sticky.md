<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item, role: Math.random() > 0.5 ? 'Owner' : 'Guest' })
);

const App = () => (
  <>
    <CheckPicker sticky data={data} defaultValue={['Kenya', 'Julius']} style={{ width: 224 }} />
    <hr />
    <CheckPicker
      sticky
      data={data}
      groupBy="role"
      defaultValue={['Kenya', 'Julius']}
      style={{ width: 224 }}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
