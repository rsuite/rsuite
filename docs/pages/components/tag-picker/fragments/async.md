<!--start-code-->

```js
import { TagPicker, HStack, Loader } from 'rsuite';

const useUsers = (defaultUsers = []) => {
  const [users, setUsers] = React.useState(defaultUsers);
  const [loading, setLoading] = React.useState(false);
  const featUsers = word => {
    setLoading(true);
    fetch(`https://api.github.com/search/users?q=${word}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.items);
        setLoading(false);
      })
      .catch(e => console.log('Oops, error', e));
  };

  return [users, loading, featUsers];
};

const App = () => {
  const [users, loading, featUsers] = useUsers();
  const [value, setValue] = React.useState([]);
  const [cacheData, setCacheData] = React.useState([]);

  const handleSelect = (value, item, event) => {
    setCacheData([...cacheData, item]);
  };

  return (
    <TagPicker
      data={users}
      cacheData={cacheData}
      value={value}
      w={300}
      labelKey="login"
      valueKey="id"
      onChange={setValue}
      onSearch={featUsers}
      onSelect={handleSelect}
      renderListbox={listbox => {
        if (loading) {
          return (
            <HStack justifyContent="center">
              <Loader content="Loading..." />
            </HStack>
          );
        }
        return listbox;
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
