<!--start-code-->

```js
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';

const { on, off } = DOMHelper;

const App = () => {
  const btnRef = React.useRef();
  const listenerRef = React.useRef();

  const handleOnEvent = () => {
    if (!listenerRef.current) {
      listenerRef.current = on(btnRef.current, 'click', () => {
        alert('click');
      });
    }
  };

  const handleOffEvent = () => {
    if (listenerRef.current) {
      listenerRef.current.off();
      listenerRef.current = null;
    }
  };

  return (
    <div>
      <div>
        <button ref={btnRef}>click me</button>
      </div>
      <hr />
      <ButtonToolbar>
        <Button onClick={handleOnEvent}>on</Button>
        <Button onClick={handleOffEvent}>off</Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
