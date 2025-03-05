<!--start-code-->

```js
import { Navbar, Menu, Avatar, Drawer } from 'rsuite';
import { IoLogoReact } from 'react-icons/io5';

const App = () => {
  return (
    <Navbar>
      <Navbar.Content>
        <Navbar.Toggle />
        <Navbar.Drawer placement="left" size="xs">
          <Drawer.Header>
            <Drawer.Title>Menu</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Menu>
              <Menu.Item>Docs</Menu.Item>
              <Menu.Item>Components</Menu.Item>
              <Menu.Item>Tools</Menu.Item>
            </Menu>
          </Drawer.Body>
        </Navbar.Drawer>
        <Navbar.Brand href="#">
          <IoLogoReact size={26} /> Brand
        </Navbar.Brand>
      </Navbar.Content>

      <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
    </Navbar>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
