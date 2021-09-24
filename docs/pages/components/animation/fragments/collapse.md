<!--start-code-->

```js
const Panel = React.forwardRef(({ style, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      background: '#000',
      width: 100,
      overflow: 'hidden',
      ...style
    }}
  >
    <p>Panel</p>
    <p>Content Content Content</p>
  </div>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const [showHorizontal, setShowHorizontal] = React.useState(true);
  const handleToggle = () => setShow(!show);
  const handleToggleHorizontal = () => setShowHorizontal(!showHorizontal);
  return (
    <div className="row">
      <ButtonToolbar>
        <Button onClick={handleToggle}>Vertical toggle</Button>
        <Button onClick={handleToggleHorizontal}>Horizontal toggle</Button>
      </ButtonToolbar>
      <hr />
      <Animation.Collapse in={show}>
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Collapse>
      <hr />
      <div style={{ width: 100 }}>
        <Animation.Collapse in={showHorizontal} dimension="width">
          {(props, ref) => <Panel style={{ height: 100 }} {...props} ref={ref} />}
        </Animation.Collapse>
      </div>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
