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
      <Card.Header>Collapse Animation</Card.Header>
      <Card.Body
        style={{
          width: 240
        }}
      >
        Demonstrates vertical and horizontal collapse transitions.
      </Card.Body>
    </div>
  </Card>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const onChange = () => setShow(!show);

  return (
    <div>
      <Button appearance="primary" onClick={onChange}>
        Toggle Collapse
      </Button>

      <hr />

      <HStack spacing={16} alignItems="flex-start">
        <VStack style={{ minWidth: 240 }}>
          <Text>Vertical Collapse</Text>
          <Animation.Collapse in={show}>
            {(props, ref) => <AnimatedPanel {...props} ref={ref} />}
          </Animation.Collapse>
        </VStack>

        <VStack style={{ minWidth: 240 }}>
          <Text>Horizontal Collapse</Text>
          <Animation.Collapse in={show} dimension="width">
            {(props, ref) => <AnimatedPanel {...props} ref={ref} />}
          </Animation.Collapse>
        </VStack>
      </HStack>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
