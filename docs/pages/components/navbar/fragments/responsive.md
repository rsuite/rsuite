<!--start-code-->

```js
import { Navbar, Nav, Avatar, Drawer, useMediaQuery } from 'rsuite';
import { IoLogoReact } from 'react-icons/io5';

const NavContent = ({ vertical }) => (
  <Nav vertical={vertical}>
    <Nav.Item>Docs</Nav.Item>
    <Nav.Item>Components</Nav.Item>
    <Nav.Item>Tools</Nav.Item>
  </Nav>
);

const NavbarBrand = () => (
  <Navbar.Brand href="#">
    <IoLogoReact size={26} /> Brand
  </Navbar.Brand>
);

const App = () => {
  const [isDesktop] = useMediaQuery('(min-width: 768px)');

  return (
    <Navbar>
      <Navbar.Content>
        {isDesktop ? (
          <>
            <NavbarBrand />
            <NavContent />
          </>
        ) : (
          <>
            <Navbar.Toggle />
            <Navbar.Drawer placement="left" size="xs">
              <Drawer.Header>
                <Drawer.Title>Menu</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <NavContent vertical />
              </Drawer.Body>
            </Navbar.Drawer>
            <NavbarBrand />
          </>
        )}
      </Navbar.Content>

      <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
    </Navbar>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
