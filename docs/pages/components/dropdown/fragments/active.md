<!--start-code-->

```js
import { Dropdown, ButtonToolbar } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Dropdown title="Dropdown" activeKey="a">
      <Dropdown.Item eventKey="a">Active Item</Dropdown.Item>
      <Dropdown.Item eventKey="b">Item B</Dropdown.Item>
      <Dropdown.Item eventKey="c">Item C</Dropdown.Item>
      <Dropdown.Item eventKey="d">Item D</Dropdown.Item>
    </Dropdown>

    <Dropdown title="Dropdown" activeKey="e-2">
      <Dropdown.Item eventKey="a">Item A</Dropdown.Item>
      <Dropdown.Item eventKey="b">Item B</Dropdown.Item>
      <Dropdown.Item eventKey="c">Item C</Dropdown.Item>
      <Dropdown.Item eventKey="d">Item D</Dropdown.Item>
      <Dropdown.Menu title="Active Menu">
        <Dropdown.Item eventKey="e-1">Item E-1</Dropdown.Item>
        <Dropdown.Item eventKey="e-2">Active Item</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
