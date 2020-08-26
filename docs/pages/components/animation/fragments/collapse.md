<!--start-code-->

```js
const Panel = React.forwardRef(({ ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      background: '#000',
      width: 100,
      overflow: 'hidden'
    }}
  >
    <p>Panel</p>
    <p>Content Content Content</p>
  </div>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const handleToggle = () => setShow(!show);
  return (
    <div className="row">
      <Button onClick={handleToggle}>toggle</Button>
      <hr />
      <Animation.Collapse in={show}>
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Collapse>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
