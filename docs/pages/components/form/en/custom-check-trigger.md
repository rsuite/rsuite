### Custom trigger verification

In some cases, there is no need for real-time validation of the form data. You can customize the way the control is validated and configure the `checkTrigger` parameter.

The default value of `checkTrigger` is `'change'`, options includes:

- `'change'` : trigger verification when data change
- `'blur'` : trigger verification when component blur
- `'none'` : Only valid when calling the `check()` method of `<Form>`

There are `checkTrigger` properties on the `<Form>` and `<FormControl>` components. You can define the entire form's validation method in `<Form>`. If there is a form component that needs to handle the validation independently, you can Set it on `<FormControl>`.

<!--start-code-->

```js
const model = Schema.Model({
  name: Schema.Types.StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.')
});
class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? 'has-error' : ''}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...props}
        />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

class CustomCheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTrigger: 'change',
      formValue: {},
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  }

  render() {
    const { formError, formValue, checkTrigger } = this.state;
    return (
      <div>
        <JSONView formValue={formValue} formError={formError} />
        checkTrigger:
        <RadioGroup
          value={checkTrigger}
          onChange={checkTrigger => {
            this.setState({
              checkTrigger,
              formError: {}
            });
          }}
        >
          <Radio value="blur">blur</Radio>
          <Radio value="change">change</Radio>
          <Radio value="none">none</Radio>
        </RadioGroup>
        <hr />
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setState({ formValue });
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formError={formError}
          formDefaultValue={formValue}
          model={model}
          checkTrigger={checkTrigger}
        >
          <CustomField
            name="name"
            label="Email"
            error={formError.name}
            message="Email address"
          />
          <Button appearance="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<CustomCheckForm />);
```

<!--end-code-->

> You can also set the check delay time `checkDelay`, the default value is `500` milliseconds.
