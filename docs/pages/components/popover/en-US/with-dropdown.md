### Used with Dropdown

<!--start-code-->

```js
const MenuPopover = ({ onSelect, ...rest }) => (
  <Popover {...rest} full>
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
      <Dropdown.Item eventKey={2}>New File with Current Profile</Dropdown.Item>
      <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
      <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
      <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
      <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
      <Dropdown.Item eventKey={7}>About</Dropdown.Item>
    </Dropdown.Menu>
  </Popover>
);

const WithDropdown = () => {
  const triggerRef = React.createRef();
  function handleSelectMenu(eventKey, event) {
    console.log(eventKey);
    triggerRef.current.hide();
  }
  return (
    <Whisper
      placement="bottomStart"
      trigger="click"
      triggerRef={triggerRef}
      speaker={<MenuPopover onSelect={handleSelectMenu} />}
    >
      <Button>File</Button>
    </Whisper>
  );
};

ReactDOM.render(<WithDropdown />);
```

<!--end-code-->
