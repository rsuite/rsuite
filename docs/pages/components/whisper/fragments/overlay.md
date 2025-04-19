<!--start-code-->

```js
import { Whisper, Button } from 'rsuite';

const Overlay = React.forwardRef(({ style, onClose, ...rest }, ref) => {
  const styles = {
    ...style,
    background: 'var(--rs-bg-overlay)',
    width: 200,
    padding: 10,
    borderRadius: 4,
    position: 'absolute',
    border: '1px solid var(--rs-border-primary)',
    boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)'
  };

  return (
    <div {...rest} style={styles} ref={ref}>
      Overlay
      <hr />
      <a onClick={onClose}>Close</a>
    </div>
  );
});

const App = () => (
  <ButtonToolbar>
    <Whisper
      trigger="click"
      speaker={(props, ref) => {
        const { left, top, onClose } = props;
        return <Overlay style={{ left, top }} onClose={onClose} ref={ref} />;
      }}
    >
      <Button>Open</Button>
    </Whisper>

    <Whisper
      trigger="click"
      delay={1000}
      speaker={(props, ref) => {
        const { left, top, onClose } = props;
        return <Overlay style={{ left, top }} onClose={onClose} ref={ref} />;
      }}
    >
      <Button>Delay (1000ms) to open</Button>
    </Whisper>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
