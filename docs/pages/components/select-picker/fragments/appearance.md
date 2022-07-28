<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <SelectPicker data={data} appearance="default" placeholder="Default" style={{ width: 224 }} />
    <hr />
    <SelectPicker data={data} appearance="subtle" placeholder="Subtle" style={{ width: 224 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
