<!--start-code-->

```js
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import TaskIcon from '@rsuite/icons/Task';
import EventDetailIcon from '@rsuite/icons/EventDetail';
import PeoplesIcon from '@rsuite/icons/Peoples';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import PieChartIcon from '@rsuite/icons/PieChart';
import GearIcon from '@rsuite/icons/Gear';
import MoneyIcon from '@rsuite/icons/Money';

const App = () => (
  <Sidenav style={{ width: 240 }}>
    <Sidenav.Body>
      <Nav>
        <Nav.Item panel>
          <Sidenav.GroupLabel>Workspace</Sidenav.GroupLabel>
        </Nav.Item>
        <Nav.Menu eventKey="1" title="Projects" icon={<EventDetailIcon />}>
          <Nav.Item eventKey="1-1">Overview</Nav.Item>
          <Nav.Item eventKey="1-2">All Projects</Nav.Item>
          <Nav.Item eventKey="1-3">Active Projects</Nav.Item>
          <Nav.Item eventKey="1-4">Archived Projects</Nav.Item>
          <Nav.Item eventKey="1-5">Templates</Nav.Item>
        </Nav.Menu>
        <Nav.Menu eventKey="2" title="Tasks" icon={<TaskIcon />}>
          <Nav.Item eventKey="2-1">My Tasks</Nav.Item>
          <Nav.Item eventKey="2-2">Assigned to Me</Nav.Item>
          <Nav.Item eventKey="2-3">Created by Me</Nav.Item>
          <Nav.Item eventKey="2-4">Task Calendar</Nav.Item>
          <Nav.Item eventKey="2-5">Task Analytics</Nav.Item>
        </Nav.Menu>
        <Nav.Menu eventKey="3" title="Reports" icon={<PieChartIcon />}>
          <Nav.Item eventKey="3-1">Project Reports</Nav.Item>
          <Nav.Item eventKey="3-2">Team Performance</Nav.Item>
          <Nav.Item eventKey="3-3">Time Tracking</Nav.Item>
          <Nav.Item eventKey="3-4">Custom Reports</Nav.Item>
        </Nav.Menu>

        <Nav.Item panel>
          <Sidenav.GroupLabel>Management</Sidenav.GroupLabel>
        </Nav.Item>
        <Nav.Menu eventKey="4" title="Team" icon={<PeoplesIcon />}>
          <Nav.Item eventKey="4-1">Team Members</Nav.Item>
          <Nav.Item eventKey="4-2">Roles & Permissions</Nav.Item>
          <Nav.Item eventKey="4-3">Teams Overview</Nav.Item>
          <Nav.Item eventKey="4-4">Departments</Nav.Item>
          <Nav.Item eventKey="4-5">Organization Chart</Nav.Item>
        </Nav.Menu>
        <Nav.Menu eventKey="5" title="HR" icon={<OperatePeopleIcon />}>
          <Nav.Item eventKey="5-1">Employee Records</Nav.Item>
          <Nav.Item eventKey="5-2">Time Off</Nav.Item>
          <Nav.Item eventKey="5-3">Attendance</Nav.Item>
          <Nav.Item eventKey="5-4">Performance Reviews</Nav.Item>
          <Nav.Item eventKey="5-5">Training</Nav.Item>
        </Nav.Menu>
        <Nav.Menu eventKey="6" title="Settings" icon={<GearIcon />}>
          <Nav.Item eventKey="6-1">General Settings</Nav.Item>
          <Nav.Item eventKey="6-2">Security</Nav.Item>
          <Nav.Item eventKey="6-3">Integrations</Nav.Item>
          <Nav.Item eventKey="6-4">Notifications</Nav.Item>
          <Nav.Item eventKey="6-5">Audit Logs</Nav.Item>
        </Nav.Menu>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
