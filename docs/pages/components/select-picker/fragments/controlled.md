<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => {
  const [value, setValue] = React.useState(null);

  return <SelectPicker value={value} onChange={setValue} data={data} style={{ width: 224 }} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
