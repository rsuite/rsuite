<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  })
);

const App = () => (
  <CheckPicker
    data={data}
    groupBy="role"
    placeholder="Select User"
    block
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
    renderValue={(value, items) => {
      return (
        <span>
          <span style={{ color: '#575757' }}>
            <i className="rs-icon rs-icon-user" /> Users :
          </span>{' '}
          {value.join(' , ')}
        </span>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
