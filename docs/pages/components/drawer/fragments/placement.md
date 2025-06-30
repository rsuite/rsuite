<!--start-code-->

```js
import { Drawer, ButtonToolbar, Button, IconButton, Placeholder } from 'rsuite';
import { RxArrowUp, RxArrowDown, RxArrowLeft, RxArrowRight } from 'react-icons/rx';
const App = () => {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          width: 110,
          gap: 6
        }}
      >
        <span />
        <IconButton icon={<RxArrowDown />} onClick={() => handleOpen('top')} />
        <span />
        <IconButton icon={<RxArrowRight />} onClick={() => handleOpen('left')} />
        <span />
        <IconButton icon={<RxArrowLeft />} onClick={() => handleOpen('right')} />
        <span />
        <IconButton icon={<RxArrowUp />} onClick={() => handleOpen('bottom')} />
        <span />
      </div>

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
