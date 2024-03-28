<!--start-code-->

```js
import { Dropdown, Avatar } from 'rsuite';

const renderToggle = props => (
  <Avatar circle {...props} src="https://i.pravatar.cc/150?u=git@rsutiejs.com" />
);

const App = () => (
  <Dropdown renderToggle={renderToggle}>
    <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
      <p>Signed in as</p>
      <strong>Tony</strong>
    </Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item>Your profile</Dropdown.Item>
    <Dropdown.Item>Your stars</Dropdown.Item>
    <Dropdown.Item>Your Gists</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item>Help</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>Sign out</Dropdown.Item>
  </Dropdown>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
