<!--start-code-->

```js
import { Navbar, Nav, Avatar, Badge, IconButton, Whisper, Popover, Menu } from 'rsuite';
import { IoLogoReact, IoNotifications } from 'react-icons/io5';

const Brand = () => (
  <Navbar.Brand href="#">
    <IoLogoReact size={26} /> Brand
  </Navbar.Brand>
);

const App = () => (
  <Navbar>
    <Navbar.Content showFrom="xs">
      <Brand />
      <Nav>
        <Nav.Item>Docs</Nav.Item>
        <Nav.Item>Components</Nav.Item>
        <Nav.Item>Tools</Nav.Item>
      </Nav>
    </Navbar.Content>

    <Navbar.Content hideFrom="xs">
      <Navbar.Toggle />
      <Brand />
    </Navbar.Content>

    <Navbar.Content>
      <Whisper
        trigger="click"
        placement="bottomEnd"
        speaker={
          <Popover full>
            <Menu>
              <Menu.Item>Profile</Menu.Item>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Item>Notifications</Menu.Item>
              <Menu.Separator />
              <Menu.Item>Sign out</Menu.Item>
            </Menu>
          </Popover>
        }
      >
        <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
      </Whisper>
    </Navbar.Content>
  </Navbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
