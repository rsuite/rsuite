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
      width: 200,
      height: 160
    }}
  >
    <div>
      <Card.Header>Bounce Animation</Card.Header>
      <Card.Body>This is a beautiful animated panel that demonstrates the bounce effect.</Card.Body>
    </div>
  </Card>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const onChange = () => setShow(!show);

  return (
    <div>
      <Button appearance="primary" onClick={onChange}>
        Toggle Bounce
      </Button>
      <hr />
      <div>
        <Animation.Bounce in={show}>
          {(props, ref) => <AnimatedPanel {...props} ref={ref} />}
        </Animation.Bounce>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
