<!--start-code-->

```js
import { Container, Header, Sidebar, Sidenav, Content, Nav, Breadcrumb, IconButton } from 'rsuite';
import FakeBrowser from '@/components/FakeBrowser';
import { Icon } from '@rsuite/icons';
import { FaReact } from 'react-icons/fa';
import {
  MdDashboard,
  MdGroup,
  MdSettings,
  MdOutlineStackedBarChart,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md';

const App = () => {
  const [expand, setExpand] = React.useState(true);
  return (
    <FakeBrowser height={800} className="sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <Brand expand={expand} />
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav defaultActiveKey="1">
                <Nav.Item eventKey="1" icon={<Icon as={MdDashboard} />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Icon as={MdGroup} />}>
                  User Group
                </Nav.Item>
                <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Advanced"
                  icon={<Icon as={MdOutlineStackedBarChart} />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="3-1">Geo</Nav.Item>
                  <Nav.Item eventKey="3-2">Devices</Nav.Item>
                  <Nav.Item eventKey="3-3">Brand</Nav.Item>
                  <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                  <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="4"
                  trigger="hover"
                  title="Settings"
                  icon={<Icon as={MdSettings} />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="4-1">Applications</Nav.Item>
                  <Nav.Item eventKey="4-2">Websites</Nav.Item>
                  <Nav.Item eventKey="4-3">Channels</Nav.Item>
                  <Nav.Item eventKey="4-4">Tags</Nav.Item>
                  <Nav.Item eventKey="4-5">Versions</Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container>
          <Header className="page-header">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="##">Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item active>Overview</Breadcrumb.Item>
            </Breadcrumb>
          </Header>
          <Content>Content</Content>
        </Container>
      </Container>
    </FakeBrowser>
  );
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Stack className="nav-toggle" justifyContent={expand ? 'flex-end' : 'center'}>
      <IconButton
        onClick={onChange}
        appearance="subtle"
        size="lg"
        icon={expand ? <MdKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />}
      />
    </Stack>
  );
};

const Brand = ({ children, expand }) => {
  return (
    <HStack className="page-brand" spacing={12}>
      <FaReact size={26} />
      {expand && <Text>Brand</Text>}
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
