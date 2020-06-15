### With Button

The default value of the `toggleComponentClass` property of`Dropdown` is `Button`. You can set the button-related props (eg. size, appearance) and display it in the style of a button.

<!--start-code-->

```js
const SizeDropdown = props => (
  <Dropdown appearance="default" {...props}>
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
    <SizeDropdown title="Large" size="lg" />
    <SizeDropdown title="Medium" size="md" />
    <SizeDropdown title="Small" size="sm" />
    <SizeDropdown title="Xsmall" size="xs" />
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
