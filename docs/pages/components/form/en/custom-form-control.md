### Custom FormControl

All Data Entry-related components can be used in forms such as `Checkbox`, `SelectPicker`, `Slider`, and so on. But you need to use the `FormControl` component for data management and data association with the `Form` component.

- `FormControl` used to bind data fields in a Form, passing the `name` attribute to the `key` of the Schema.Model object.
- `FormControl` the default is an `Input` component, which can be set through the ʻaccepter` component.

<!--start-code-->

```js
const { ArrayType, StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  skills: ArrayType()
    .minLength(2, 'Please select at least 2 types of Skills.')
    .isRequired('This field is required.'),
  status: ArrayType()
    .minLength(2, 'Please select at least 2 types of Status.')
    .isRequired('This field is required.'),
  level: NumberType().min(5, 'This field must be greater than 5')
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

class CustomFieldForm extends React.Component {
  constructor(props) {
    super(props);
    const formValue = {
      number: 10,
      skills: ['Node.js'],
      browser: 'Chrome',
      status: ['open'],
      level: 1,
      level2: 1,
      createDate: new Date()
    };
    this.state = {
      formValue: formValue,
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      Alert.error('Error');
      return;
    }
    Alert.success('Success');
  }
  render() {
    const { formError, formValue } = this.state;

    return (
      <div>
        <JSONView formValue={formValue} formError={formError} />
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            console.log(formValue);
            this.setState({ formValue });
          }}
          onCheck={formError => {
            console.log(formError, 'formError');
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
        >
          <CustomField
            name="number"
            label="Number"
            accepter={InputNumber}
            error={formError.number}
          />

          <CustomField
            name="skills"
            label="Skills"
            accepter={CheckboxGroup}
            error={formError.skills}
            inline
          >
            <Checkbox value={'Node.js'}>Node.js</Checkbox>
            <Checkbox value={'CSS3'}>CSS3</Checkbox>
            <Checkbox value={'Javascript'}>Javascript</Checkbox>
            <Checkbox value={'HTML5'}>HTML5</Checkbox>
          </CustomField>

          <CustomField
            name="browser"
            label="Browser"
            accepter={RadioGroup}
            error={formError.browser}
            inline
          >
            <Radio value={'Chrome'}>Chrome</Radio>
            <Radio value={'FireFox'}>FireFox</Radio>
            <Radio value={'IE'}>IE</Radio>
          </CustomField>

          <CustomField
            name="status"
            label="Status"
            accepter={CheckPicker}
            error={formError.status}
            style={{ display: 'inline-block', width: 200 }}
            data={[
              { label: 'Todo', value: 'todo' },
              { label: 'Open', value: 'open' },
              { label: 'Close', value: 'close' },
              { label: 'Error', value: 'error' },
              { label: 'Processing', value: 'processing' },
              { label: 'Done', value: 'done' }
            ]}
          />

          <CustomField
            accepter={Slider}
            min={0}
            max={20}
            name="level"
            label="Level"
            style={{ width: 200, margin: '10px 0' }}
            errorMessage={formError.level}
          />

          <CustomField
            accepter={DatePicker}
            name="createDate"
            label="Create Date"
            errorMessage={formError.createDate}
          />

          <FormGroup>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<CustomFieldForm />);
```

<!--end-code-->

> For example: `<FormControl accepter={CheckboxGroup} />` , FormControl renders a `<CheckboxGroup>` component and binds to the Schema.Model instance in the Form. The rich text editor in the following example, using [react-quill](https://github.com/zenoamaro/react-quill)
