<!--start-code-->

```js
const panelStyles = {
  padding: '15px 20px',
  color: '#aaa',
};

const headerStyles = {
  padding: 20,
  fontSize: 16,
  background: '#34c3ff',
  color: ' #fff',
};

const instance = (
  <div style={{ width: 240 }}>
    <Sidenav defaultOpenKeys={['3', '4']}>
      <Sidenav.Header>
        <div style={headerStyles}>Custom Sidenav</div>
      </Sidenav.Header>
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" active icon={<Dashboard />}>
            Dashboard
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<Group />}>
            User Group
          </Nav.Item>
          <Dropdown eventKey="3" title="Advanced" icon={<Magic />}>
            <Dropdown.Item divider />
            <Dropdown.Item panel style={panelStyles}>
              Reports
            </Dropdown.Item>
            <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
            <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
            <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
            <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item panel style={panelStyles}>
              Settings
            </Dropdown.Item>
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
ReactDOM.render(instance);
```

<!--end-code-->
