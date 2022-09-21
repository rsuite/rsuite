<!--start-code-->

```js
import { Dropdown, ButtonToolbar } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Dropdown title="Hover" trigger="hover" disabled>
      <Dropdown.Item>Item A</Dropdown.Item>
      <Dropdown.Item>Item B</Dropdown.Item>
      <Dropdown.Item>Item C</Dropdown.Item>
    </Dropdown>

    <Dropdown title="Click" trigger="click" disabled>
      <Dropdown.Item>Item A</Dropdown.Item>
      <Dropdown.Item>Item B</Dropdown.Item>
      <Dropdown.Item>Item C</Dropdown.Item>
    </Dropdown>

    <Dropdown title="Right Click" trigger="contextMenu" disabled>
      <Dropdown.Item>Item A</Dropdown.Item>
      <Dropdown.Item>Item B</Dropdown.Item>
      <Dropdown.Item>Item C</Dropdown.Item>
    </Dropdown>

    <Dropdown title="Disabled Item">
      <Dropdown.Item disabled>Disabled Item A</Dropdown.Item>
      <Dropdown.Item disabled>Disabled Item B</Dropdown.Item>
      <Dropdown.Item>Item C</Dropdown.Item>
    </Dropdown>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
