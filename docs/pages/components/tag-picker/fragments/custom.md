<!--start-code-->

```js
import { TagPicker, Tag, HStack } from 'rsuite';
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
  <TagPicker
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
    <HStack>
      <FaUser /> <span>{label}</span>
    </HStack>
  );
};

const renderOptionGroup = (label, item) => {
  return (
    <HStack>
      <FaUserGroup />
      <span>
        {label} - ({item.children.length})
      </span>
    </HStack>
  );
};

const renderValue = (values, items, tags) => {
  return values.map((tag, index) => (
    <Tag key={index}>
      <FaUser /> {tag}
    </Tag>
  ));
};
```

<!--end-code-->
