<!--start-code-->

```js
import { Animation, Button } from 'rsuite';

const Panel = React.forwardRef((props, ref) => (
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

  const onChange = placement => {
    setShow(!show);
    setPlacement(placement);
  };

  return (
    <div className="row">
      <ButtonToolbar>
        <Button onClick={() => onChange('left')}>Slide Left</Button>
        <Button onClick={() => onChange('right')}>Slide Right</Button>
        <Button onClick={() => onChange('top')}>Slide Top</Button>
        <Button onClick={() => onChange('bottom')}>Slide Bottom</Button>
      </ButtonToolbar>
      <hr />
      <Animation.Slide in={show} placement={placement}>
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Slide>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
