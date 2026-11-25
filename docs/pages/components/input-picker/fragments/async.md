<!--start-code-->

```js
import { InputPicker, HStack, Loader } from 'rsuite';

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
  return (
    <InputPicker
      data={users}
      w={224}
      labelKey="login"
      valueKey="id"
      onSearch={featUsers}
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
