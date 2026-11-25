<!--start-code-->

```js
import { Drawer, SegmentedControl, ButtonToolbar, Button, IconButton, Placeholder } from 'rsuite';

const App = () => {
  const [size, setSize] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState('right');

  const handleOpen = value => {
    setSize(value);
    setOpen(true);
  };
  return (
    <>
      <SegmentedControl
        data={[
          { value: 'left', label: 'left' },
          { value: 'right', label: 'right' },
          { value: 'top', label: 'top' },
          { value: 'bottom', label: 'bottom' }
        ]}
        value={placement}
        onChange={setPlacement}
      />
      <hr />
      <ButtonToolbar>
        <Button size="xs" onClick={() => handleOpen('xs')}>
          Xsmall
        </Button>
        <Button size="sm" onClick={() => handleOpen('sm')}>
          Small
        </Button>
        <Button size="md" onClick={() => handleOpen('md')}>
          Medium
        </Button>
        <Button size="lg" onClick={() => handleOpen('lg')}>
          Large
        </Button>
        <Button size="lg" onClick={() => handleOpen('full')}>
          Full page
        </Button>
      </ButtonToolbar>

      <hr />
      <ButtonToolbar>
        <Button onClick={() => handleOpen(400)}>
          <code>size=400</code>
        </Button>

        <Button onClick={() => handleOpen('50rem')}>
          <code>size='50rem'</code>
        </Button>

        <Button onClick={() => handleOpen('calc(100% - 120px)')}>
          <code>size='calc(100% - 120px)'</code>
        </Button>
      </ButtonToolbar>

      <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(false)}>
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
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
