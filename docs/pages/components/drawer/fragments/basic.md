<!--start-code-->

```js
const App = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <ButtonToolbar>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </ButtonToolbar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Paragraph />
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setOpen(false)} appearance="primary">
            Confirm
          </Button>
          <Button onClick={() => setOpen(false)} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
