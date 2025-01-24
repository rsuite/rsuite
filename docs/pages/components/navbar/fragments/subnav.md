<!--start-code-->

```js
import { Navbar, Nav, Avatar } from 'rsuite';
import { IoLogoReact, IoLanguage } from 'react-icons/io5';

const App = () => (
  <Navbar>
    <Navbar.Content>
      <Navbar.Brand href="#">
        <IoLogoReact size={26} /> Brand
      </Navbar.Brand>
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

    <Navbar.Content>
      <Nav>
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
