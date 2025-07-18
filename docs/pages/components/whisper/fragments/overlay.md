<!--start-code-->

```js
import { Whisper, Button, Box } from 'rsuite';

const Overlay = React.forwardRef(({ onClose, left, top, ...rest }, ref) => {
  return (
    <Box
      bg="var(--rs-bg-overlay)"
      w="200px"
      p="10px"
      pos="absolute"
      bd="1px solid var(--rs-border-primary)"
      rounded="4px"
      shadow="md"
      ref={ref}
      left={left}
      top={top}
      {...rest}
    >
      Overlay
      <hr />
      <a onClick={onClose}>Close</a>
    </Box>
  );
});

const App = () => (
  <ButtonToolbar>
    <Whisper
      trigger="click"
      speaker={(props, ref) => {
        const { left, top, onClose } = props;
        return <Overlay left={left} top={top} onClose={onClose} ref={ref} />;
      }}
    >
      <Button>Open</Button>
    </Whisper>

    <Whisper
      trigger="click"
      delay={1000}
      speaker={(props, ref) => {
        const { left, top, onClose } = props;
        return <Overlay left={left} top={top} onClose={onClose} ref={ref} />;
      }}
    >
      <Button>Delay (1000ms) to open</Button>
    </Whisper>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
