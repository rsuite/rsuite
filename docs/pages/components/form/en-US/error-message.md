### Error Message

Error message can be set in 2 ways:

- The `<FormControl>` component passes an `errorMessage` property setting error message, and `errorPlacement` sets the location of the error message display.
- Customize a prompt message.

<!--start-code-->

```js
const errorPlacementData = [
  { label: 'bottomStart', value: 'bottomStart' },
  { label: 'bottomEnd', value: 'bottomEnd' },
  { label: 'topStart', value: 'topStart' },
  { label: 'topEnd', value: 'topEnd' },
  { label: 'leftStart', value: 'leftStart' },
  { label: 'rightStart', value: 'rightStart' },
  { label: 'leftEnd', value: 'leftEnd' },
  { label: 'rightEnd', value: 'rightEnd' }
];

const errorStyles = errorVisible => {
  return { display: errorVisible ? 'block' : 'none', color: 'red', marginTop: 6 };
};

const App = () => {
  const [errorVisible, setErrorVisible] = React.useState(false);
  const [errorPlacement, setErrorPlacement] = React.useState('bottomStart');
  const errorMessage = errorVisible ? 'This field is required' : null;

  return (
    <div>
      <Form>
        <FormGroup>
          <FormControl
            name="input-2"
            placeholder="FormControl"
            errorMessage={errorMessage}
            errorPlacement={errorPlacement}
          />
        </FormGroup>
        <FormGroup>
          <InputGroup inside>
            <FormControl
              name="input-1"
              placeholder="FormControl in InputGroup"
              errorMessage={errorMessage}
              errorPlacement={errorPlacement}
            />
            <InputGroup.Addon>
              <Icon icon="avatar" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <FormControl name="input-3" placeholder="Custom error messages" />
          <div style={errorStyles(errorVisible)}>{errorMessage}</div>
        </FormGroup>
      </Form>
      <hr/>
      <div className={'rs-form-control-wrapper'} style={{width: 300}}>
        <Input placeholder="Custom error messages"/>
        <ErrorMessage show={errorVisible} placement={errorPlacement}>
            {errorMessage}
        </ErrorMessage>
      </div>
      <hr />
      Show Error: <Toggle onChange={setErrorVisible} checked={errorVisible} />
      <SelectPicker
        value={errorPlacement}
        placeholder="errorPlacement"
        data={errorPlacementData}
        cleanable={false}
        onChange={setErrorPlacement}
      />
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
