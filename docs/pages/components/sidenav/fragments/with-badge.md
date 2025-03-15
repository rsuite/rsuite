<!--start-code-->

```js
import NoticeIcon from '@rsuite/icons/Notice';
import TaskIcon from '@rsuite/icons/Task';
import CalenderDateIcon from '@rsuite/icons/CalenderDate';
import HistoryIcon from '@rsuite/icons/History';
import { Sidenav, Nav, Badge, HStack } from 'rsuite';

const NavItem = ({ icon, children, badge }) => (
  <Nav.Item icon={icon}>
    <HStack justifyContent="space-between" style={{ flex: 1 }}>
      {children}
      {badge}
    </HStack>
  </Nav.Item>
);

const App = () => (
  <Sidenav style={{ width: 240 }}>
    <Sidenav.Body>
      <Nav>
        <NavItem icon={<NoticeIcon />} badge={<Badge content={15} />}>
          Notification
        </NavItem>
        <NavItem icon={<TaskIcon />} badge={<Badge content={6} />}>
          To-Do List
        </NavItem>
        <NavItem icon={<CalenderDateIcon />} badge={<Badge content="new" color="yellow" />}>
          Schedule
        </NavItem>
        <NavItem icon={<HistoryIcon />} badge={<Badge content="6.0.0" color="green" />}>
          Version History
        </NavItem>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
