<!--start-code-->

```js
import { Navbar, Nav, Avatar, Text } from 'rsuite';
import { IoLogoReact } from 'react-icons/fa';

const App = () => (
  <Navbar>
    <Navbar.Brand href="#">
      <IoLogoReact size={26} /> Brand
    </Navbar.Brand>
    <Nav>
      <Nav.Item>Docs</Nav.Item>
      <Nav.Item>Components</Nav.Item>
      <Nav.Item>Tools</Nav.Item>
    </Nav>
    <HStack>
      <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
      <Text>John Doe</Text>
    </HStack>
  </Navbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
