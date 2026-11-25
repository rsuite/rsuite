<!--start-code-->

```js
import {
  Form,
  Button,
  CheckboxGroup,
  RadioGroup,
  Checkbox,
  Radio,
  CheckPicker,
  NumberInput,
  Slider,
  DatePicker,
  Message,
  toaster,
  Row,
  Col,
  Toggle
} from 'rsuite';
import { SchemaModel, StringType, ArrayType } from 'rsuite/Schema';

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-10`} ref={ref} className={error ? 'has-error' : ''}>
      <Form.Label>{label} </Form.Label>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.Text>{message}</Form.Text>
    </Form.Group>
  );
});

const model = SchemaModel({
  skills: ArrayType()
    .minLength(2, 'Please select at least 2 types of Skills.')
    .isRequired('This field is required.'),
  status: ArrayType()
    .minLength(2, 'Please select at least 2 types of Status.')
    .isRequired('This field is required.'),
  level: NumberType().min(5, 'This field must be greater than 5')
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
    createDate: new Date(),
    toggle: true
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      toaster.push(<Message type="error">Error</Message>);
      return;
    }
    toaster.push(<Message type="success">Success</Message>);
  };

  return (
    <Row>
      <Col span={{ xs: 24, md: 12 }}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Stack>
            <Field name="number" label="Number" accepter={NumberInput} error={formError.number} />
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
              w={200}
              my={10}
              errorMessage={formError.level}
            />

            <Field
              accepter={DatePicker}
              name="createDate"
              label="Create Date"
              errorMessage={formError.createDate}
              editable={false}
            />

            <Field accepter={Toggle} name="toggle" label="Toggle" errorMessage={formError.toggle} />
          </Form.Stack>

          <ButtonToolbar mt={20}>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
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
