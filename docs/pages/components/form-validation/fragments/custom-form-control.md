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

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-10`} ref={ref} className={error ? 'has-error' : ''}>
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
    number: 10,
    skills: ['Node.js'],
    browser: 'Chrome',
    status: ['open'],
    level: 1,
    level2: 1,
    createDate: new Date()
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      toaster.push(<Message type="error">Error</Message>);
      return;
    }
    toaster.push(<Message type="success">Success</Message>);
  };

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Field name="number" label="Number" accepter={InputNumber} error={formError.number} />
          <Field
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
          </Field>

          <Field
            name="browser"
            label="Browser"
            accepter={RadioGroup}
            error={formError.browser}
            inline
          >
            <Radio value={'Chrome'}>Chrome</Radio>
            <Radio value={'FireFox'}>FireFox</Radio>
            <Radio value={'IE'}>IE</Radio>
          </Field>

          <Field
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

          <Field
            accepter={Slider}
            min={0}
            max={20}
            name="level"
            label="Level"
            style={{ width: 200, margin: '10px 0' }}
            errorMessage={formError.level}
          />

          <Field
            accepter={DatePicker}
            name="createDate"
            label="Create Date"
            errorMessage={formError.createDate}
          />

          <Form.Group>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
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

> For example: `<Form.Control accepter={CheckboxGroup} />` , Form.Control renders a `<CheckboxGroup>` component and binds to the Schema.Model instance in the Form. The rich text editor in the following example, using [react-quill](https://github.com/zenoamaro/react-quill)
