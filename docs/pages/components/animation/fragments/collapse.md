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
      height: 88,
      display: 'inline-block',
      overflow: 'hidden'
    }}
  >
    <div>
      <p>Panel</p>
      <p>Content Content Content</p>
    </div>
  </div>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const onChange = () => setShow(!show);

  return (
    <div className="row">
      <Button onClick={onChange}>collapse</Button>
      <hr />
      <Animation.Collapse in={show}>
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Collapse>

      <div style={{ width: 100, marginLeft: 10, display: 'inline-block' }}>
        <Animation.Collapse in={show} dimension="width">
          {(props, ref) => <Panel {...props} ref={ref} />}
        </Animation.Collapse>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
