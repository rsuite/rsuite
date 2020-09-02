<!--start-code-->

```js
const App = () => {
  const [backdrop, setBackdrop] = React.useState('static');
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <span>Backdrop: </span>
      <RadioGroup name="radioList" inline value={backdrop} onChange={setBackdrop}>
        <Radio value="static">static</Radio>
        <Radio value={true}>true</Radio>
        <Radio value={false}>false</Radio>
      </RadioGroup>
      <hr />

      <ButtonToolbar>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </ButtonToolbar>
      <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
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
