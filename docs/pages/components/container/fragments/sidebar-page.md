<!--start-code-->

```js
const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const iconStyles = {
  width: 56,
  height: 56,
  padding: 18,
  lineHeight: '56px',
  textAlign: 'center'
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Nav.Menu
            placement="topStart"
            trigger="click"
            renderTitle={children => {
              return <Cog style={iconStyles} />;
            }}
          >
            <Nav.Item>Help</Nav.Item>
            <Nav.Item>Settings</Nav.Item>
            <Nav.Item>Sign out</Nav.Item>
          </Nav.Menu>
        </Nav>

        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeft /> : <AngleRight />}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

const Page = () => {
  const [expand, setExpand] = React.useState(true);
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <LogoAnalytics style={{ fontSize: 20 }} />
              <span style={{ marginLeft: 12 }}> BRAND</span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon={<Dashboard />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Group />}>
                  User Group
                </Nav.Item>
                <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Advanced"
                  icon={<Magic />}
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
                  icon={<GearCircle />}
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
          <Header>
            <h2>Page Title</h2>
          </Header>
          <Content>Content</Content>
        </Container>
      </Container>
    </div>
  );
};

ReactDOM.render(<Page />);
```

<!--end-code-->
