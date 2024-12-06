<!--start-code-->

```js
import React from 'react';
import { useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';

const Toast = React.forwardRef((props, ref) => {
  const { type, placement, duration, children, onClose, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      style={{ padding: 10, background: '#fff', borderRadius: 4, marginTop: 10 }}
    >
      {children}
      <hr />
      <button onClick={onClose}>Close</button>
    </div>
  );
});

const App = () => {
  const toaster = useToaster();
  const container = React.useRef();

  return (
    <div ref={container}>
      <Button
        onClick={() =>
          toaster.push(
            <Toast>
              <h4>Custom Toast</h4>
              <p>This is a custom toast with a close button.</p>
            </Toast>,
            { container: () => container.current }
          )
        }
        appearance="primary"
      >
        Push
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
