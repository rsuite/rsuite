<!--start-code-->

```js
import { Popover, Whisper, Button, Menu } from 'rsuite';

const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
  <Popover ref={ref} {...rest} full>
    <Menu onSelect={onSelect}>
      <Menu.Item eventKey={1} shortcut="⌘ N">
        New File
      </Menu.Item>
      <Menu.Item eventKey={2} shortcut="⌘ ⇧ N">
        New File with Current Profile
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item eventKey={3} shortcut="⌘ ⇧ S">
        Download As...
      </Menu.Item>
      <Menu.Item eventKey={4} shortcut="⌘ ⇧ E">
        Export PDF
      </Menu.Item>
      <Menu.Item eventKey={5} shortcut="⌘ ⇧ H">
        Export HTML
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item eventKey={6} shortcut="⌘ ,">
        Settings
      </Menu.Item>
      <Menu.Item eventKey={7} shortcut="⌘ I">
        About
      </Menu.Item>
    </Menu>
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
