<!--start-code-->

```js
import { Animation, Button, Card } from 'rsuite';

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
      <Card.Header>Fade Animation</Card.Header>
      <Card.Body>This panel demonstrates a smooth fade transition effect.</Card.Body>
    </div>
  </Card>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const onChange = () => setShow(!show);

  return (
    <div>
      <Button appearance="primary" onClick={onChange}>
        Toggle Fade
      </Button>
      <hr />
      <div>
        <Animation.Fade in={show}>
          {(props, ref) => <AnimatedPanel {...props} ref={ref} />}
        </Animation.Fade>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
