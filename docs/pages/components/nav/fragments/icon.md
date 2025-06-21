<!--start-code-->

```js
import { Nav } from 'rsuite';
import {
  MdHome,
  MdMessage,
  MdSettings,
  MdHelp,
  MdNotifications,
  MdExitToApp
} from 'react-icons/md';

const App = () => (
  <Nav>
    <Nav.Item icon={<MdHome />}>Home</Nav.Item>
    <Nav.Item icon={<MdMessage />}>Messages</Nav.Item>
    <Nav.Menu title="Settings" icon={<MdSettings />}>
      <Nav.Item icon={<MdHelp />}>Help Center</Nav.Item>
      <Nav.Item icon={<MdNotifications />}>Notifications</Nav.Item>
      <Nav.Item icon={<MdExitToApp />}>Logout</Nav.Item>
    </Nav.Menu>
  </Nav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
