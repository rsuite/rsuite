<!--start-code-->

```js
const Overlay = React.forwardRef(({ style, onClose, ...rest }, ref) => {
  const styles = {
    ...style,
    background: '#fff',
    width: 200,
    padding: 10,
    borderRadius: 4,
    position: 'absolute',
    border: '1px solid #ddd',
    boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)'
  };

  return (
    <div {...rest} style={styles} ref={ref}>
      Overlay
      <hr />
      <button onClick={onClose}>close</button>
    </div>
  );
});

const App = () => (
  <Whisper
    trigger="click"
    speaker={(props, ref) => {
      const { className, left, top, onClose } = props;
      return <Overlay style={{ left, top }} onClose={onClose} className={className} ref={ref} />;
    }}
  >
    <Button>Open</Button>
  </Whisper>
);

ReactDOM.render(<App />);
```

<!--end-code-->
