<!--start-code-->

```js
import { Drawer, SegmentedControl, ButtonToolbar, Button, Placeholder, Text } from 'rsuite';

const App = () => {
  const [backdrop, setBackdrop] = React.useState('static');
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <SegmentedControl
        data={[
          { value: 'static', label: 'static' },
          { value: true, label: 'true' },
          { value: false, label: 'false' }
        ]}
        value={backdrop}
        onChange={setBackdrop}
      />
      <hr />

      <ButtonToolbar>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </ButtonToolbar>
      <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
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
          <Placeholder.Paragraph />
        </Drawer.Body>
      </Drawer>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
