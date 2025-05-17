<!--start-code-->

```js
import { Button, Menu, Popover, Whisper } from 'rsuite';

const renderSpeaker = ({ onClose, className, ...rest }, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} full>
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

const App = () => {
  return (
    <Whisper placement="bottomStart" trigger="click" speaker={renderSpeaker}>
      <Button>File</Button>
    </Whisper>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
