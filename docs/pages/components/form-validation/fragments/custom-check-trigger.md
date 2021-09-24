<!--start-code-->

```js
const model = Schema.Model({
  name: Schema.Types.StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.')
});

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

const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({});
  const [checkTrigger, setCheckTrigger] = React.useState('change');

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  };

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <RadioGroup
          inline
          appearance="picker"
          value={checkTrigger}
          onChange={value => {
            setCheckTrigger(value);
            setFormError({});
          }}
        >
          <span style={styles.radioGroupLabel}>checkTrigger: </span>
          <Radio value="blur">blur</Radio>
          <Radio value="change">change</Radio>
          <Radio value="none">none</Radio>
        </RadioGroup>
        <hr />
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formError={formError}
          formDefaultValue={formValue}
          model={model}
          checkTrigger={checkTrigger}
        >
          <Field name="name" label="Email" error={formError.name} message="Email address" />
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12}>
        <JSONView formValue={formValue} formError={formError} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
