### Trigger

Set the trigger event with the `trigger` attribute, support the event:

* `click` (default)
* `hover`
* `contextMenu`

> Support multiple events: `Array<click, hover, contextMenu>`

<!--start-code-->

```js
const CustomDropdown = ({ ...props }) => (
  <Dropdown {...props}>
    <Dropdown.Item>New File</Dropdown.Item>
    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item>Download As...</Dropdown.Item>
    <Dropdown.Item>Export PDF</Dropdown.Item>
    <Dropdown.Item>Export HTML</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>About</Dropdown.Item>
  </Dropdown>
);

const instance = (
  <ButtonToolbar>
    <CustomDropdown title="Hover" trigger="hover" />
    <CustomDropdown title="Click" trigger="click" />
    <CustomDropdown title="Right Click" trigger="contextMenu" />
    <CustomDropdown title="Click and Hover" trigger={['click', 'hover']} />
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
