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

  return (
    <Button
      onClick={() =>
        toaster.push(
          <Toast>
            <h4>Custom Toast</h4>
            <p>
              This is a custom toast with a close button. You can also set the duration and
              placement.
            </p>
          </Toast>,
          { placement: 'topCenter', duration: 5000 }
        )
      }
      appearance="primary"
    >
      Push
    </Button>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
