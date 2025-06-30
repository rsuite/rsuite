<!--start-code-->

```js
import { useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';

const Toast = React.forwardRef((props, ref) => {
  const { type, placement, duration, children, onClose, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      style={{ padding: 10, background: 'var(--rs-bg-card)', borderRadius: 4, marginTop: 10 }}
    >
      {children}
      <hr />
      <Button onClick={onClose} size="sm">
        Close
      </Button>
    </div>
  );
});

const App = () => {
  const toaster = useToaster();

  const pushMessage = () => {
    toaster.push(
      <Toast>
        <h4>Custom Toast</h4>
        <p>
          This is a custom toast with a close button. You can also set the duration and placement.
        </p>
      </Toast>,
      { placement: 'topCenter', duration: 5000 }
    );
  };

  return (
    <Button onClick={pushMessage} appearance="primary">
      Push
    </Button>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
