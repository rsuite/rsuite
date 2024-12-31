<!--start-code-->

```js
import { Navbar, Nav, Avatar, Text, Badge, IconButton } from 'rsuite';
import { IoLogoReact, IoNotifications } from 'react-icons/io5';

const App = () => (
  <Navbar>
    <Navbar.Content>
      <Navbar.Brand href="#">
        <IoLogoReact size={26} /> Brand
      </Navbar.Brand>
      <Nav>
        <Nav.Item>Docs</Nav.Item>
        <Nav.Item>Components</Nav.Item>
        <Nav.Item>Tools</Nav.Item>
      </Nav>
    </Navbar.Content>

    <Navbar.Content>
      <Badge content={6} shape="circle">
        <IconButton icon={<IoNotifications size={20} />} circle appearance="subtle" size="xs" />
      </Badge>
      <HStack>
        <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
        <Text>John Doe</Text>
      </HStack>
    </Navbar.Content>
  </Navbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
