### Schema Model

Form Check needs to be used `<Form>`, `<FormControl>` and `Schema.Model` 。

- `<Form>` To define a form, you can set `value` and `model` for the form, and `model` is the data model created by `Schema.Model`.
- `<FormControl>` Define a Filed that corresponds to the `key` of the `Schema.Model` object via the `name` property. For detailed reference: Custom Form Components.
- `Schema.Model` Define a data model, using the reference [schema](/components/schema).
- Custom trigger check: `<Form>` instance provides `check` and `checkForField` methods, used to trigger form checksum field validation

<!--start-code-->

```js
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  age: NumberType('Please enter a valid number.').range(
    18,
    30,
    'Please enter a number from 18 to 30'
  ),
  password: StringType().isRequired('This field is required.'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
});

class TextField extends React.PureComponent {
  render() {
    const { name, label, accepter, ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...props} />
      </FormGroup>
    );
  }
}

class CheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        email: '',
        age: '',
        password: '',
        verifyPassword: ''
      },
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckEmail = this.handleCheckEmail.bind(this);
  }
  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  }

  handleCheckEmail() {
    this.form.checkForField('email', checkResult => {
      console.log(checkResult);
    });
  }
  render() {
    const { formError, formValue } = this.state;

    return (
      <div>
        <JSONView formValue={formValue} formError={formError} />
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setState({ formValue });
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
        >
          <TextField name="name" label="Username" />

          <TextField name="email" label="Email" />
          <TextField name="age" label="Age" />
          <TextField name="password" label="Password" type="password" />

          <TextField name="verifyPassword" label="Verify password" type="password" />

          <ButtonToolbar>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Submit
            </Button>

            <Button onClick={this.handleCheckEmail}>Check Email</Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<CheckForm />);
```

<!--end-code-->
