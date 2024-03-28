<!--start-code-->

```js
import { Dropdown } from 'rsuite';

const App = () => (
  <Dropdown.Menu style={{ width: 300, border: '1px solid #ddd' }}>
    <Dropdown.Item shortcut="⌘ N">New File</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ ⇧ N">New File with Current Profile</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ ⇧ S">Download As...</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ P">Export PDF</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ ⇧ E">Export HTML</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ ,">Settings</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ ⇧ ,">About</Dropdown.Item>
  </Dropdown.Menu>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
