<!--start-code-->

```js
import { InputPicker } from 'rsuite';
import UserIcon from '@rsuite/icons/legacy/User';
import GroupIcon from '@rsuite/icons/legacy/Group';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  })
);

const App = () => (
  <InputPicker
    data={data}
    groupBy="role"
    placeholder="Select User"
    style={{ width: 224 }}
    renderMenuItem={(label, item) => {
      return (
        <>
          <UserIcon /> {label}
        </>
      );
    }}
    renderMenuGroup={(label, item) => {
      return (
        <>
          <GroupIcon /> {label} - ({item.children.length})
        </>
      );
    }}
    renderValue={(value, item, selectedElement) => {
      return (
        <div>
          <span style={{ color: '#575757' }}>
            <UserIcon /> User :
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
