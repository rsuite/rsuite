<!--start-code-->

```js
import { TagPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <TagPicker
      tagProps={{
        checkable: true,
        onCheck: e => {}
      }}
      data={data}
      style={{ width: 300 }}
    />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
