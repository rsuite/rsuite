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
    <Nav.Item icon={<MdHome />} eventKey="home">
      Home
    </Nav.Item>
    <Nav.Item icon={<MdMessage />} eventKey="messages">
      Messages
    </Nav.Item>
    <Nav.Menu title="Settings" icon={<MdSettings />}>
      <Nav.Item icon={<MdHelp />} eventKey="help-center">
        Help Center
      </Nav.Item>
      <Nav.Item icon={<MdNotifications />} eventKey="notifications">
        Notifications
      </Nav.Item>
      <Nav.Item icon={<MdExitToApp />} eventKey="logout">
        Logout
      </Nav.Item>
    </Nav.Menu>
  </Nav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
