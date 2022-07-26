<!--start-code-->

```js
import { Popover, Whisper, Button, Dropdown } from 'rsuite';

const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
  <Popover ref={ref} {...rest} full>
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
));

const App = () => {
  const ref = React.useRef();
  function handleSelectMenu(eventKey, event) {
    console.log(eventKey);
    ref.current.close();
  }
  return (
    <Whisper
      placement="bottomStart"
      controlId="control-id-with-dropdown"
      trigger="click"
      ref={ref}
      speaker={<MenuPopover onSelect={handleSelectMenu} />}
    >
      <Button>File</Button>
    </Whisper>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
