<!--start-code-->

```js
import { Dropdown, ButtonToolbar, Popover, IconButton } from 'rsuite';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import PlusIcon from '@rsuite/icons/Plus';

const renderMenu = ({ onClose, left, top, className }, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Menu onSelect={handleSelect}>
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
  );
};

const App = () => (
  <ButtonToolbar>
    <Whisper placement="bottomStart" trigger="click" speaker={renderMenu}>
      <IconButton appearance="primary" icon={<PlusIcon />} circle />
    </Whisper>

    <Whisper placement="bottomStart" trigger="click" speaker={renderMenu}>
      <IconButton appearance="primary" icon={<PlusIcon />} placement="left">
        New
      </IconButton>
    </Whisper>

    <ButtonGroup>
      <Button>Create</Button>
      <Whisper placement="bottomStart" trigger="click" speaker={renderMenu}>
        <IconButton icon={<ArrowDownIcon />} />
      </Whisper>
    </ButtonGroup>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
