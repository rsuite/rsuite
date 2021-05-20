<!--start-code-->

```js
const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};

const App = () => {
  const [size, setSize] = React.useState('xs');
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };
  return (
    <div>
      <RadioGroup inline appearance="picker" value={size} onChange={setSize}>
        <span style={styles.radioGroupLabel}>Size: </span>
        <Radio value="lg">Large</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="sm">Small</Radio>
        <Radio value="xs">Xsmall</Radio>
      </RadioGroup>
      <hr />
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
          <Paragraph rows={8} />
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
