<!--start-code-->

```js
const styles = {
  width: 250,
  display: 'inline-table',
  marginRight: 10,
};

const SidenavInstance = ({ ...props }) => {
  return (
    <div style={styles}>
      <Sidenav {...props} defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" active icon={<Dashboard />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<Group />}>
              User Group
            </Nav.Item>
            <Dropdown eventKey="3" title="Advanced" icon={<Magic />}>
              <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
              <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
              <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
              <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
            </Dropdown>
            <Dropdown eventKey="4" title="Settings" icon={<GearCircle />}>
              <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
              <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
              <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
              <Dropdown.Menu eventKey="4-5" title="Custom Action">
                <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

const instance = (
  <div className="nav-wrapper">
    <SidenavInstance />
    <SidenavInstance appearance="inverse" />
    <SidenavInstance appearance="subtle" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
