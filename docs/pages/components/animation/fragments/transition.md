<!--start-code-->

```js
import { Animation, Button } from 'rsuite';

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
  const onChange = () => setShow(!show);

  return (
    <div className="row">
      <Button onClick={onChange}>transition</Button>
      <hr />
      <Animation.Transition
        exitedClassName="custom-exited"
        exitingClassName="custom-exiting"
        enteredClassName="custom-entered"
        enteringClassName="custom-entering"
        onEnter={() => {
          console.log('onEnter');
        }}
        onEntering={() => {
          console.log('onEntering');
        }}
        onEntered={() => {
          console.log('onEntered');
        }}
        onExit={() => {
          console.log('onExit');
        }}
        onExiting={() => {
          console.log('onExiting');
        }}
        onExited={() => {
          console.log('onExited');
        }}
        in={show}
      >
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Transition>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
