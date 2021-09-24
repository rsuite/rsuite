<!--start-code-->

```js
const Panel = React.forwardRef(({ ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      background: '#000',
      width: 100,
      height: 160,
      overflow: 'hidden'
    }}
  >
    <p>Panel</p>
    <p>Content Content Content</p>
  </div>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const [placement, setPlacement] = React.useState('right');

  const handleToggle = placement => {
    setShow(!show);
    setPlacement(placement);
  };

  return (
    <div className="row">
      <ButtonToolbar>
        <Button onClick={() => handleToggle('left')}>Slide Left</Button>
        <Button onClick={() => handleToggle('right')}>Slide Right</Button>
        <Button onClick={() => handleToggle('top')}>Slide Top</Button>
        <Button onClick={() => handleToggle('bottom')}>Slide Bottom</Button>
      </ButtonToolbar>
      <hr />
      <Animation.Slide in={show} placement={placement}>
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Slide>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
