<!--start-code-->

```js
import { Form, Button, RadioGroup, Radio, Row, Col } from 'rsuite';
import { SchemaModel, StringType } from 'rsuite/Schema';

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group ref={ref} className={error ? 'has-error' : ''}>
      <Form.Label>{label} </Form.Label>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.Text>{message}</Form.Text>
    </Form.Group>
  );
});

const model = SchemaModel({
  name: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.')
});

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
    <Row>
      <Col span={{ xs: 24, md: 12 }}>
        <RadioGroup
          inline
          appearance="picker"
          value={checkTrigger}
          onChange={value => {
            setCheckTrigger(value);
            setFormError({});
          }}
        >
          <label>checkTrigger: </label>
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
          <Form.Stack>
            <Field name="name" label="Email" error={formError.name} message="Email address" />
          </Form.Stack>
          <Button appearance="primary" onClick={handleSubmit} mt={20}>
            Submit
          </Button>
        </Form>
      </Col>
      <Col hidden={{ md: true }} span={{ xs: 24, md: 12 }}>
        <JSONView formValue={formValue} formError={formError} />
      </Col>
    </Row>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
