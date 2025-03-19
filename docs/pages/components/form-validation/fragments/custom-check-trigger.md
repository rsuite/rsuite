<!--start-code-->

```js
import { Form, Button, RadioGroup, Radio, Schema, Panel, Box, Row, Col } from 'rsuite';
import JSONTree from 'react-json-tree';

const JSONView = ({ formValue, formError }) => (
  <Box mb={10}>
    <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
      <JSONTree data={formValue} />
    </Panel>

    <Panel className="json-tree-wrapper" header={<p>formError</p>}>
      <JSONTree data={formError} />
    </Panel>
  </Box>
);

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

const model = Schema.Model({
  name: Schema.Types.StringType()
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
          <Field name="name" label="Email" error={formError.name} message="Email address" />
          <Button appearance="primary" onClick={handleSubmit}>
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
