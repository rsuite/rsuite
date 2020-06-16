### 自定义浮层

<!--start-code-->

```js
const Overlay = React.forwardRef(({ style, ...rest }, ref) => {
  const styles = {
    ...style,
    background: '#000',
    padding: 20,
    borderRadius: 4,
    position: 'absolute',
    boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)'
  };
  return (
    <div {...rest} style={styles} ref={ref}>
      Overlay
    </div>
  );
});

const App = () => (
  <Whisper
    trigger="click"
    speaker={(props, ref) => {
      const { className, left, top } = props;
      return <Overlay style={{ left, top }} className={className} ref={ref} />;
    }}
  >
    <Button>click me</Button>
  </Whisper>
);

ReactDOM.render(<App />);
```

<!--end-code-->
