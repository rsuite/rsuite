### Used with Popover

<!--start-code-->

```js
const Menu = ({ onSelect }) => (
  <Dropdown.Menu onSelect={onSelect}>
    <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
    <Dropdown.Item eventKey={2}>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
    <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
    <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
    <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
    <Dropdown.Item eventKey={7}>About</Dropdown.Item>
  </Dropdown.Menu>
);

const MenuPopover = ({ onSelect, ...rest }) => (
  <Popover {...rest} full>
    <Menu onSelect={onSelect} />
  </Popover>
);

class WithPopover extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
  }
  handleSelectMenu(eventKey, event) {
    console.log(eventKey);
    this.trigger.hide();
  }
  render() {
    return (
      <Whisper
        placement="bottomStart"
        trigger="click"
        triggerRef={ref => {
          this.trigger = ref;
        }}
        speaker={<MenuPopover onSelect={this.handleSelectMenu} />}
      >
        <Button>File</Button>
      </Whisper>
    );
  }
}

ReactDOM.render(<WithPopover />);
```

<!--end-code-->
