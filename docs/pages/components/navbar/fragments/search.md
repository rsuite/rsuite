<!--start-code-->

```js
import { Navbar, Nav, Avatar, Input, InputGroup } from 'rsuite';
import { IoLogoReact } from 'react-icons/io5';
import SearchIcon from '@rsuite/icons/Search';

const Searchbox = () => (
  <InputGroup inside showFrom="xs">
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
    <Input type="search" placeholder="Search here..." />
  </InputGroup>
);

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
      <Searchbox />
      <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
    </Navbar.Content>
  </Navbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
