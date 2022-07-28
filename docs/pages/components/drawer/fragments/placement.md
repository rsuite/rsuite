<!--start-code-->

```js
import { Drawer, ButtonToolbar, Button, IconButton, Placeholder } from 'rsuite';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };
  return (
    <div>
      <ButtonToolbar>
        <IconButton icon={<AngleRightIcon />} onClick={() => handleOpen('left')}>
          Left
        </IconButton>
        <IconButton icon={<AngleLeftIcon />} onClick={() => handleOpen('right')}>
          Right
        </IconButton>
        <IconButton icon={<AngleDownIcon />} onClick={() => handleOpen('top')}>
          Top
        </IconButton>
        <IconButton icon={<AngleUpIcon />} onClick={() => handleOpen('bottom')}>
          Bottom
        </IconButton>
      </ButtonToolbar>

      <Drawer placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
