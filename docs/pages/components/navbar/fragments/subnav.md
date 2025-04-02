<!--start-code-->

```js
import { Navbar, Nav, Avatar } from 'rsuite';
import { IoLogoReact, IoLanguage } from 'react-icons/io5';

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
        <Nav.Menu title="Docs">
          <Nav.Item>Quick Start</Nav.Item>
          <Nav.Item>Guides</Nav.Item>
          <Nav.Item>API Reference</Nav.Item>
        </Nav.Menu>
        <Nav.Menu title="Components">
          <Nav.Item>Grid</Nav.Item>
          <Nav.Item>Button</Nav.Item>
          <Nav.Item>Icon</Nav.Item>
        </Nav.Menu>
        <Nav.Menu title="Tools">
          <Nav.Item>Codemods</Nav.Item>
          <Nav.Item>Sketch Plugin</Nav.Item>
          <Nav.Item>CLI</Nav.Item>
        </Nav.Menu>
      </Nav>
    </Navbar.Content>

    <Navbar.Content hideFrom="xs">
      <Navbar.Toggle />
      <Brand />
    </Navbar.Content>

    <Navbar.Content>
      <Nav showFrom="xs">
        <Nav.Menu title="Languages" icon={<IoLanguage size="16" />}>
          <Nav.Item>English</Nav.Item>
          <Nav.Item>简体中文</Nav.Item>
        </Nav.Menu>
      </Nav>
      <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
    </Navbar.Content>
  </Navbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
