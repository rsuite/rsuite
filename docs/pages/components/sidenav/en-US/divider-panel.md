### Custom Side Navigation

* Set the `panel` property to customize a panel area.
* Set the `divider` property and set a split line.

<!--start-code-->

```js
const panelStyles = {
  padding: '15px 20px',
  color: '#aaa'
};

const headerStyles = {
  padding: 20,
  fontSize: 16,
  background: '#34c3ff',
  color: ' #fff'
};

const instance = (
  <div style={{ width: 250 }}>
    <Sidenav defaultOpenKeys={['3', '4']}>
      <Sidenav.Header>
        <div style={headerStyles}>Custom Sidenav</div>
      </Sidenav.Header>
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
            Dashboard
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
            User Group
          </Nav.Item>
          <Dropdown eventKey="3" title="Advanced" icon={<Icon icon="magic" />}>
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
