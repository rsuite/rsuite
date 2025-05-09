<!--start-code-->

```js
import { Form, Button, ButtonToolbar, PasswordInput, Panel, Box, Row, Col } from 'rsuite';
import { SchemaModel, StringType, NumberType } from 'rsuite/Schema';

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

const model = SchemaModel({
  name: StringType().isRequired(),
  email: StringType().isEmail().isRequired(),
  age: NumberType().range(18, 30),
  password: StringType().isRequired().proxy(['confirmPassword']),
  confirmPassword: StringType().equalTo('password')
});

const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group ref={ref}>
      <Form.Label>{label} </Form.Label>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  };

  const handleCheckEmail = () => {
    formRef.current.checkForField('email', checkResult => {
      console.log(checkResult);
    });
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={{ xs: 24, md: 12 }}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Stack>
            <TextField name="name" label="Username" />
            <TextField name="email" label="Email" />
            <TextField name="age" label="Age" />
            <TextField name="password" label="Password" accepter={PasswordInput} />
            <TextField name="confirmPassword" label="Confirm Password" accepter={PasswordInput} />
          </Form.Stack>

          <ButtonToolbar mt={20}>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>

            <Button onClick={handleCheckEmail}>Check Email</Button>
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
