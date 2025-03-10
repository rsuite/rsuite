<!--start-code-->

```js
import { Animation, Button, ButtonToolbar, Card } from 'rsuite';

const AnimatedPanel = React.forwardRef((props, ref) => (
  <Card
    {...props}
    ref={ref}
    shaded
    bordered={false}
    style={{
      color: '#fff',
      background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
      width: 240,
      height: 120
    }}
  >
    <div>
      <Card.Header>Slide Animation</Card.Header>
      <Card.Body>This panel demonstrates sliding transitions from different directions.</Card.Body>
    </div>
  </Card>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const [placement, setPlacement] = React.useState('right');

  const onChange = placement => {
    setShow(!show);
    setPlacement(placement);
  };

  return (
    <div>
      <ButtonToolbar>
        <Button appearance="primary" onClick={() => onChange('left')}>Slide Left</Button>
        <Button appearance="primary" onClick={() => onChange('right')}>Slide Right</Button>
        <Button appearance="primary" onClick={() => onChange('top')}>Slide Top</Button>
        <Button appearance="primary" onClick={() => onChange('bottom')}>Slide Bottom</Button>
      </ButtonToolbar>
      <hr />
      <div>
        <Animation.Slide in={show} placement={placement}>
          {(props, ref) => <AnimatedPanel {...props} ref={ref} />}
        </Animation.Slide>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
