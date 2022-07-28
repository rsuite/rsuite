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
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Menu title="New File">
          <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
          <Dropdown.Item eventKey={2}>New File with Current Profile</Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
        <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
        <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
        <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
        <Dropdown.Item eventKey={7}>About</Dropdown.Item>
      </Dropdown.Menu>
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
