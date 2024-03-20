<!--start-code-->

```js
import { Message, useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';

const App = () => {
  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('topCenter');
  const toaster = useToaster();

  const message = (
    <Message showIcon type={type} closable>
      <strong>{type}!</strong> The message appears on the {placement}.
    </Message>
  );

  return (
    <div>
      {message}
      <hr />
      <ButtonToolbar>
        <SelectPicker
          cleanable={false}
          value={type}
          data={[
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'error', value: 'error' }
          ]}
          onChange={setType}
          style={{ width: 200 }}
        />
        <SelectPicker
          cleanable={false}
          value={placement}
          data={[
            { label: 'topStart', value: 'topStart' },
            { label: 'topCenter', value: 'topCenter' },
            { label: 'topEnd', value: 'topEnd' },
            { label: 'bottomStart', value: 'bottomStart' },
            { label: 'bottomCenter', value: 'bottomCenter' },
            { label: 'bottomEnd', value: 'bottomEnd' }
          ]}
          onChange={setPlacement}
          style={{ width: 200 }}
        />
        <Button
          onClick={() => toaster.push(message, { placement, duration: 5000 })}
          appearance="primary"
        >
          Push
        </Button>
        <Button onClick={() => toaster.remove()}>Remove</Button>
        <Button onClick={() => toaster.clear()}>Clear</Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
