<!--start-code-->

```js
import { Navbar, Nav, Avatar } from 'rsuite';
import {
  IoLogoReact,
  IoLanguage,
  IoRocketOutline,
  IoBookOutline,
  IoDocumentTextOutline,
  IoGridOutline,
  IoCubeOutline,
  IoCodeSlashOutline,
  IoHammerOutline,
  IoExtensionPuzzleOutline,
  IoTerminalOutline,
  IoGlobeOutline,
  IoLanguageOutline
} from 'react-icons/io5';

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
          <Nav.Item icon={<IoRocketOutline />}>Quick Start</Nav.Item>
          <Nav.Item icon={<IoBookOutline />}>Guides</Nav.Item>
          <Nav.Item icon={<IoDocumentTextOutline />}>API Reference</Nav.Item>
        </Nav.Menu>
        <Nav.Menu title="Components">
          <Nav.Item icon={<IoGridOutline />}>Layout Components</Nav.Item>
          <Nav.Item icon={<IoExtensionPuzzleOutline />}>UI Elements</Nav.Item>
          <Nav.Item icon={<IoCodeSlashOutline />}>Icons & Graphics</Nav.Item>
        </Nav.Menu>
        <Nav.Menu title="Tools">
          <Nav.Item icon={<IoHammerOutline />}>Codemods</Nav.Item>
          <Nav.Item icon={<IoCubeOutline />}>Sketch Plugin</Nav.Item>
          <Nav.Item icon={<IoTerminalOutline />}>CLI</Nav.Item>
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
          <Nav.Item icon={<IoGlobeOutline />}>English</Nav.Item>
          <Nav.Item icon={<IoLanguageOutline />}>简体中文</Nav.Item>
        </Nav.Menu>
      </Nav>
      <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
    </Navbar.Content>
  </Navbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
