### Option Active State

<!--start-code-->
```js
const instance = (
   <ButtonToolbar>
    <Dropdown title="Default" activeKey="a">
      <Dropdown.Item eventKey="a">Active Item</Dropdown.Item>
      <Dropdown.Item eventKey="b">Item B</Dropdown.Item>
      <Dropdown.Item eventKey="c">Item C</Dropdown.Item>
      <Dropdown.Item eventKey="d">Item D</Dropdown.Item>
    </Dropdown>

    <Dropdown title="Default" activeKey="e-2">
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
ReactDOM.render(instance);
```
<!--end-code-->
