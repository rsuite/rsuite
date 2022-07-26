<!--start-code-->

```js
import { InputPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

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
      style={{ width: 224 }}
      labelKey="login"
      valueKey="id"
      onSearch={featUsers}
      renderMenu={menu => {
        if (loading) {
          return (
            <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
              <SpinnerIcon spin /> Loading...
            </p>
          );
        }
        return menu;
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
