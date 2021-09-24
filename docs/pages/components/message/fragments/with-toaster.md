<!--start-code-->

```js
const App = () => {
  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('topCenter');
  const message = (
    <Message showIcon type={type} >
      {type}: The message appears on the {placement}.
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
        <Button onClick={() => toaster.push(message, { placement })}>Push</Button>
        <Button onClick={() => toaster.remove()}>Remove</Button>
        <Button onClick={() => toaster.clear()}>Clear</Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
