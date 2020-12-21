<!--start-code-->

```js
// import Sidenav from 'rsuite/lib/Sidenav';
// import Nav from 'rsuite/lib/Nav';
// import Dropdown from 'rsuite/lib/Dropdown';

const styles = {
  width: 240,
  display: 'inline-table',
  marginRight: 10
};

const MySidenav = ({ ...props }) => {
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

const App = () => {
  const [activeKey, setActiveKey] = React.useState('1');
  const [openKeys, setOpenKeys] = React.useState(['3', '4']);
  return (
    <div className="nav-wrapper">
      <MySidenav
        activeKey={activeKey}
        openKeys={openKeys}
        onSelect={setActiveKey}
        onOpenChange={setOpenKeys}
      />
      <MySidenav
        activeKey={activeKey}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        onSelect={setActiveKey}
        appearance="inverse"
      />
      <MySidenav
        activeKey={activeKey}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        onSelect={setActiveKey}
        appearance="subtle"
      />
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
