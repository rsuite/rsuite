<!--start-code-->

```js
import { TagPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  })
);

const App = () => (
  <>
    <TagPicker
      creatable
      data={data}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagPicker
      creatable
      data={data}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      groupBy="role"
      placeholder="Group Select"
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
