<!--start-code-->

```js
import { Animation, Button } from 'rsuite';

const Panel = React.forwardRef((props, ref) => (
  <div
    {...props}
    ref={ref}
    style={{ background: '#000', width: 100, height: 160, overflow: 'hidden' }}
  >
    <p>Panel</p>
    <p>Content Content Content</p>
  </div>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const onChange = () => setShow(!show);

  return (
    <div className="row">
      <Button onClick={onChange}>bounce</Button>
      <hr />
      <Animation.Bounce in={show}>
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Bounce>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
