<!--start-code-->

```js
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import SettingIcon from '@rsuite/icons/Setting';
import PieChartIcon from '@rsuite/icons/PieChart';
import DataAuthorizeIcon from '@rsuite/icons/DataAuthorize';
import { Sidenav, Nav, HStack, VStack } from 'rsuite';
import { SiProtondb } from 'react-icons/si';

const Header = () => (
  <VStack style={{ padding: '10px 10px 0 10px' }} spacing={12}>
    <HStack>
      <SiProtondb size={32} /> Brand
    </HStack>
  </VStack>
);

const App = () => (
  <div style={{ width: 240 }}>
    <Sidenav defaultOpenKeys={['3', '4']}>
      <Sidenav.Header>
        <Header />
      </Sidenav.Header>
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" icon={<DashboardIcon />}>
            Overview
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<PeoplesIcon />}>
            Customers
          </Nav.Item>
          <Nav.Menu eventKey="3" title="Analytics" icon={<PieChartIcon />}>
            <Nav.Item divider />
            <Nav.Item panel>
              <Sidenav.GroupLabel>Reports</Sidenav.GroupLabel>
            </Nav.Item>
            <Nav.Item eventKey="3-1">Geo</Nav.Item>
            <Nav.Item eventKey="3-2">Devices</Nav.Item>
            <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
            <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            <Nav.Item divider />
            <Nav.Item panel>
              <Sidenav.GroupLabel>Settings</Sidenav.GroupLabel>
            </Nav.Item>
            <Nav.Item eventKey="3-5">Applications</Nav.Item>
            <Nav.Item eventKey="3-6">Channels</Nav.Item>
            <Nav.Item eventKey="3-7">Versions</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
