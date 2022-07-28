<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  })
);

const App = () => (
  <SelectPicker
    data={data}
    style={{ width: 224 }}
    groupBy="role"
    placeholder="Select User"
    renderMenuItem={(label, item) => {
      return (
        <div>
          <i className="rs-icon rs-icon-user" /> {label}
        </div>
      );
    }}
    renderMenuGroup={(label, item) => {
      return (
        <div>
          <i className="rs-icon rs-icon-group" /> {label} - ({item.children.length})
        </div>
      );
    }}
    renderValue={(value, item) => {
      return (
        <div>
          <span style={{ color: '#575757' }}>
            <i className="rs-icon rs-icon-user" /> User :
          </span>{' '}
          {value}
        </div>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
