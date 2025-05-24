<!--start-code-->

```js
import { Menu } from 'rsuite';

const App = () => (
  <Menu>
    <Menu.Item>New File</Menu.Item>
    <Menu.Item>New File with Current Profile</Menu.Item>
    <Menu.Item>Download As...</Menu.Item>
    <Menu.Separator />
    <Menu.Item>Export PDF</Menu.Item>
    <Menu.Item>Export HTML</Menu.Item>
    <Menu.Separator />
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>About</Menu.Item>
  </Menu>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
