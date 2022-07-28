<!--start-code-->

```js
import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, IconButton, Placeholder } from 'rsuite';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

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
    <>
      <RadioGroup inline appearance="picker" value={size} onChange={setSize}>
        <span style={styles.radioGroupLabel}>Size: </span>
        <Radio value="full">Full page</Radio>
        <Radio value="lg">Large</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="sm">Small</Radio>
        <Radio value="xs">Xsmall</Radio>
      </RadioGroup>
      <hr />
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
