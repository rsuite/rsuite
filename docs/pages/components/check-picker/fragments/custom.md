<!--start-code-->

```js
import { CheckPicker } from 'rsuite';
import { FaUserGroup, FaUser } from 'react-icons/fa6';
import { mockUsers } from './mock';

/**
 *  Data structure:
 *  [
 *    { firstLetter: 'A', name: 'Alan', firstName: 'Alan' },
 *    { firstLetter: 'B', name: 'Benson', firstName: 'Benson' },
 *  ]
 */
const data = mockUsers(100)
  .map(item => {
    const firstLetter = item.firstName[0].toUpperCase();
    return { firstLetter, ...item };
  })
  .sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));

const App = () => (
  <CheckPicker
    block
    data={data}
    groupBy="firstLetter"
    labelKey="firstName"
    valueKey="name"
    placeholder="Select User"
    renderOption={renderOption}
    renderOptionGroup={renderOptionGroup}
    renderValue={renderValue}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));

const renderOption = (label, item) => {
  return (
    <Box>
      <FaUser /> <span>{label}</span>
    </Box>
  );
};

const renderOptionGroup = (label, item) => {
  return (
    <Box>
      <FaUserGroup />
      <span>
        {label} - ({item.children.length})
      </span>
    </Box>
  );
};

const renderValue = (value, items) => {
  return (
    <Box>
      <FaUserGroup /> Users: {value.join(' , ')}
    </Box>
  );
};

const Box = ({ children }) => {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{children}</div>;
};
```

<!--end-code-->
