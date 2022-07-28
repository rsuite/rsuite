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
      <Button onClick={onChange}>fade</Button>
      <hr />
      <Animation.Fade in={show}>{(props, ref) => <Panel {...props} ref={ref} />}</Animation.Fade>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
