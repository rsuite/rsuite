<!--start-code-->

```js
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import SettingIcon from '@rsuite/icons/Setting';
import PieChartIcon from '@rsuite/icons/PieChart';
import DataAuthorizeIcon from '@rsuite/icons/DataAuthorize';
import { Sidenav, Nav } from 'rsuite';

const App = () => (
  <Sidenav style={{ width: 240 }}>
    <Sidenav.Body>
      <Nav>
        <Nav.Item icon={<DashboardIcon />}>Overview</Nav.Item>
        <Nav.Item icon={<PeoplesIcon />}>Customers</Nav.Item>
        <Nav.Item icon={<PieChartIcon />}>Analytics</Nav.Item>
        <Nav.Item icon={<DataAuthorizeIcon />}>Security</Nav.Item>
        <Nav.Item icon={<SettingIcon />}>Settings</Nav.Item>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
