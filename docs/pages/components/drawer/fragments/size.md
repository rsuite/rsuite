<!--start-code-->

```js
import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, IconButton, Placeholder } from 'rsuite';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

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
      <RadioGroup inline appearance="picker" value={placement} onChange={setPlacement}>
        <RadioLabel>Placement: </RadioLabel>
        <Radio value="left">left</Radio>
        <Radio value="right">right</Radio>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
      </RadioGroup>
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
