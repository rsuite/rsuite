<!--start-code-->

```js
const App = () => {
  const [open, setOpen] = React.useState(false);
  const [openWithHeader, setOpenWithHeader] = React.useState(false);

  return (
    <div>
      <ButtonToolbar>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button onClick={() => setOpenWithHeader(true)}>Open with header</Button>
      </ButtonToolbar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <Paragraph />
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
          <Paragraph />
        </Drawer.Body>
      </Drawer>
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
