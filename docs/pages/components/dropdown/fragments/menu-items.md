<!--start-code-->

```js
import { Dropdown } from 'rsuite';

const App = () => (
  <Dropdown.Menu
    style={{
      width: 200,
      border: '1px solid #ddd'
    }}
  >
    <Dropdown.Item>New File</Dropdown.Item>
    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item>Download As...</Dropdown.Item>
    <Dropdown.Item>Export PDF</Dropdown.Item>
    <Dropdown.Item>Export HTML</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>About</Dropdown.Item>
  </Dropdown.Menu>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
