<!--start-code-->

```js
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import SettingIcon from '@rsuite/icons/Setting';
import PieChartIcon from '@rsuite/icons/PieChart';
import DataAuthorizeIcon from '@rsuite/icons/DataAuthorize';

const App = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState('1');
  return (
    <div style={{ width: 240 }}>
      <Toggle
        onChange={setExpanded}
        checked={expanded}
        checkedChildren="Expand"
        unCheckedChildren="Collapse"
      />
      <hr />
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Overview
            </Nav.Item>
            <Nav.Menu eventKey="2" title="Customers" icon={<PeoplesIcon />}>
              <Nav.Item eventKey="2-1">Users</Nav.Item>
              <Nav.Item eventKey="2-2">Groups</Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="3" title="Analytics" icon={<PieChartIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="4" title="Security" icon={<DataAuthorizeIcon />}>
              <Nav.Item eventKey="4-1">Users</Nav.Item>
              <Nav.Item eventKey="4-2">Roles</Nav.Item>
              <Nav.Item eventKey="4-3">Permissions</Nav.Item>
            </Nav.Menu>

            <Nav.Menu eventKey="5" title="Settings" icon={<SettingIcon />}>
              <Nav.Item eventKey="5-1">Applications</Nav.Item>
              <Nav.Item eventKey="5-2">Channels</Nav.Item>
              <Nav.Item eventKey="5-3">Versions</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Footer>
          <Sidenav.Toggle onToggle={setExpanded} />
        </Sidenav.Footer>
      </Sidenav>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
