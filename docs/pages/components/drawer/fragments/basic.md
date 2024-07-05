<!--start-code-->

```js
import { Drawer, ButtonToolbar, Button, Placeholder } from 'rsuite';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [openWithHeader, setOpenWithHeader] = React.useState(false);

  return (
    <>
      <ButtonToolbar>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button onClick={() => setOpenWithHeader(true)}>Open with header</Button>
      </ButtonToolbar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <Placeholder.Paragraph />
        </Drawer.Body>
      </Drawer>

      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpenWithHeader(false)}>Cancel</Button>
            <Button onClick={() => setOpenWithHeader(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={20} />
        </Drawer.Body>
      </Drawer>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
