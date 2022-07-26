<!--start-code-->

```js
import { TagPicker, Tag } from 'rsuite';
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
  <TagPicker
    data={data}
    groupBy="role"
    placeholder="Select User"
    block
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
    renderValue={(values, items, tags) => {
      return values.map((tag, index) => (
        <Tag key={index}>
          <UserIcon /> {tag}
        </Tag>
      ));
    }}
  />
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
