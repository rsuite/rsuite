<!--start-code-->

```js
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
        <IconButton icon={<AngleLeft />} onClick={() => handleOpen('left')}>
          Left
        </IconButton>
        <IconButton icon={<AngleRight />} onClick={() => handleOpen('right')}>
          Right
        </IconButton>
        <IconButton icon={<AngleUp />} onClick={() => handleOpen('top')}>
          Top
        </IconButton>
        <IconButton icon={<AngleDown />} onClick={() => handleOpen('bottom')}>
          Bottom
        </IconButton>
      </ButtonToolbar>

      <Drawer full placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Paragraph rows={8} />
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
