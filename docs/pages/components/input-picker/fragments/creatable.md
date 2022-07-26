<!--start-code-->

```js
import { InputPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  })
);

const App = () => (
  <>
    <InputPicker
      creatable
      data={data}
      style={{ width: 224 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <InputPicker
      creatable
      data={data}
      style={{ width: 224 }}
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
