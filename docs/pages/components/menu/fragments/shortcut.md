<!--start-code-->

```js
import { Menu } from 'rsuite';

const App = () => (
  <Menu>
    <Menu.Item shortcut="⌘ N">New File</Menu.Item>
    <Menu.Item shortcut="⌘ ⇧ N">New File with Current Profile</Menu.Item>
    <Menu.Item shortcut="⌘ ⇧ S">Download As...</Menu.Item>
    <Menu.Item shortcut="⌘ P">Export PDF</Menu.Item>
    <Menu.Item shortcut="⌘ ⇧ E">Export HTML</Menu.Item>
    <Menu.Item shortcut="⌘ ,">Settings</Menu.Item>
    <Menu.Item shortcut="⌘ ⇧ ,">About</Menu.Item>
  </Menu>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
