<!--start-code-->

```js
import {
  Navbar,
  Nav,
  Avatar,
  Menu,
  HStack,
  Text,
  Container,
  Header,
  Sidebar,
  Content,
  Footer,
  Panel,
  VStack,
  Button
} from 'rsuite';

import {
  IoLogoReact,
  IoLanguage,
  IoDocumentTextOutline,
  IoGridOutline,
  IoLayersOutline,
  IoTerminalOutline,
  IoBrushOutline,
  IoColorPaletteOutline,
  IoShapesOutline,
  IoBarChartOutline
} from 'react-icons/io5';

const border = '1px solid var(--rs-divider-border)';

const BorderedIcon = ({ as: Component }) => (
  <div
    style={{
      display: 'flex',
      border,
      padding: 6,
      borderRadius: 6
    }}
  >
    <Component color="#228be6" size={20} />
  </div>
);

const MegaMenuFeatures = ({ onClose }) => {
  const handleSelect = () => {
    onClose();
  };

  return (
    <Container>
      <Header
        style={{
          borderBottom: border,
          padding: 12
        }}
      >
        <HStack justifyContent="space-between">
          <Text size="lg">Features</Text>
          <a>View all</a>
        </HStack>
      </Header>
      <Content>
        <HStack spacing={16}>
          <Panel bodyFill>
            <Menu onSelect={handleSelect}>
              <Menu.Item
                icon={<BorderedIcon as={IoBarChartOutline} />}
                description="Data visualization"
              >
                Charts
              </Menu.Item>
              <Menu.Item
                icon={<BorderedIcon as={IoDocumentTextOutline} />}
                description="Input and data collection"
              >
                Forms
              </Menu.Item>
              <Menu.Item icon={<BorderedIcon as={IoGridOutline} />} description="Data presentation">
                Tables
              </Menu.Item>
              <Menu.Item icon={<BorderedIcon as={IoLayersOutline} />} description="Popup dialogs">
                Modals
              </Menu.Item>
            </Menu>
          </Panel>
          <Panel bodyFill>
            <Menu onSelect={handleSelect}>
              <Menu.Item
                icon={<BorderedIcon as={IoTerminalOutline} />}
                description="Command-line interface"
              >
                CLI
              </Menu.Item>
              <Menu.Item icon={<BorderedIcon as={IoBrushOutline} />} description="UI/UX resources">
                Design Kit
              </Menu.Item>
              <Menu.Item
                icon={<BorderedIcon as={IoColorPaletteOutline} />}
                description="Customizable styles"
              >
                Themes
              </Menu.Item>
              <Menu.Item icon={<BorderedIcon as={IoShapesOutline} />} description="Visual symbols">
                Icons
              </Menu.Item>
            </Menu>
          </Panel>
        </HStack>
      </Content>
      <Footer
        style={{
          borderTop: border,
          padding: 12
        }}
      >
        <HStack justifyContent="space-between" spacing={20}>
          <VStack spacing={2}>
            <Text size="sm">Explore Our Features</Text>
            <Text muted>
              Start building applications with our powerful and flexible components.
            </Text>
          </VStack>
          <Button appearance="primary">Get started</Button>
        </HStack>
      </Footer>
    </Container>
  );
};

const MegaMenuContact = ({ onClose }) => {
  return (
    <Container>
      <Header
        style={{
          borderBottom: border,
          padding: 12
        }}
      >
        <Text size="lg">Contact Us</Text>
      </Header>
      <Content
        style={{
          padding: 16
        }}
      >
        <HStack spacing={16} alignItems="flex-start">
          <div
            style={{
              width: 400,
              padding: 8
            }}
          >
            <img
              src="https://placehold.co/400x250/8f8e94/FFFFFF?text=Map location"
              alt="Map location"
              height="250"
            />
          </div>
          <VStack spacing={24} alignItems="flex-start" style={{ padding: 8 }}>
            <VStack>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Acme Corporation
              </Text>
              <Text>Haidian District, Beijing</Text>
              <Text>123 Innovation Avenue</Text>
              <Text>Tech Plaza, 15th Floor</Text>
            </VStack>

            <VStack>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Business Hours
              </Text>
              <Text>Monday to Friday: 8 AM - 5 PM</Text>
              <Text>Saturday and Sunday: Closed</Text>
            </VStack>
            <Button appearance="primary" onClick={onClose}>
              Contact Us
            </Button>
          </VStack>
        </HStack>
      </Content>
    </Container>
  );
};

const MegaMenuResources = ({ onClose }) => {
  const handleSelect = () => {
    onClose();
  };

  return (
    <Container>
      <Header
        style={{
          borderBottom: border,
          padding: 12
        }}
      >
        <Text size="lg">Resources</Text>
      </Header>
      <Content>
        <HStack alignItems="stretch">
          <Sidenav
            defaultOpenKeys={['1', '2']}
            style={{
              width: 200
            }}
          >
            <Sidenav.Body>
              <Nav>
                <Nav.Menu eventKey="1" title="Documents" icon={<PageIcon />}>
                  <Nav.Item eventKey="1-1">Recent Files</Nav.Item>
                  <Nav.Item eventKey="1-2">My Documents</Nav.Item>
                  <Nav.Item eventKey="1-3">Shared with Me</Nav.Item>
                </Nav.Menu>
                <Nav.Menu eventKey="2" title="Images" icon={<ImageIcon />}>
                  <Nav.Item eventKey="2-1">Photo Albums</Nav.Item>
                  <Nav.Item eventKey="2-2">Screenshots</Nav.Item>
                </Nav.Menu>
                <Nav.Item eventKey="3" icon={<FolderIcon />}>
                  All Folders
                </Nav.Item>
                <Nav.Item eventKey="4" icon={<StarIcon />}>
                  Favorites
                </Nav.Item>
                <Nav.Item eventKey="5" icon={<TrashIcon />}>
                  Trash
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <div
            style={{
              width: 400,
              padding: 20
            }}
          >
            <Placeholder.Grid rows={12} columns={3} />
          </div>
        </HStack>
      </Content>
    </Container>
  );
};

const App = () => (
  <Navbar>
    <Navbar.Content>
      <Navbar.Brand href="#">
        <IoLogoReact size={26} /> Brand
      </Navbar.Brand>
      <Nav>
        <Nav.MegaMenu title="Features">{MegaMenuFeatures}</Nav.MegaMenu>
        <Nav.MegaMenu title="Resources">{MegaMenuResources}</Nav.MegaMenu>
        <Nav.MegaMenu title="Contact">{MegaMenuContact}</Nav.MegaMenu>
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
