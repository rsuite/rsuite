<!--start-code-->

```js
const { ArrayType, StringType } = Schema.Types;
const model = Schema.Model({
  phone: StringType().isRequired('This field is required.')
});

const InputMask = React.forwardRef(({ onChange, ...rest }, ref) => (
  <MaskedInput
    {...rest}
    ref={ref}
    className="rs-input"
    onChange={event => {
      onChange(event.target.value);
    }}
  />
));

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    phone: ''
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      toaster.push(<Message type="error">Error</Message>);
      return;
    }
    toaster.push(<Message type="success">Success</Message>);
  };

  return (
    <div>
      <JSONView formValue={formValue} formError={formError} />
      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formDefaultValue={formValue}
        model={model}
      >
        <Field
          name="phone"
          label="Phone Number"
          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          accepter={InputMask}
          error={formError.phone}
        />

        <Form.Group>
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
