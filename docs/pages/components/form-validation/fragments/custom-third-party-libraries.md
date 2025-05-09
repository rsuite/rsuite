<!--start-code-->

```js
import { Form, Button, Panel, Message, toaster, Box, Row, Col } from 'rsuite';
import { SchemaModel, StringType } from 'rsuite/Schema';
import JSONTree from 'react-json-tree';
import Select from 'react-select';

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
      <Form.Label>{label} </Form.Label>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.Text>{message}</Form.Text>
    </Form.Group>
  );
});

const model = SchemaModel({
  foods: StringType().isRequired('This field is required.')
});

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const CustomSelect = React.forwardRef((props, ref) => {
  const { value, onChange, ...rest } = props;
  return (
    <Select
      isClearable
      width={200}
      ref={ref}
      {...rest}
      onChange={option => {
        onChange(option?.value || null);
      }}
    />
  );
});

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    foods: ''
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      toaster.push(
        <Message showIcon type="error">
          Error
        </Message>
      );
      return;
    }
    toaster.push(
      <Message showIcon type="success">
        Success
      </Message>
    );
  };

  return (
    <Row>
      <Col span={{ xs: 24, md: 12 }}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formDefaultValue={formValue}
          model={model}
        >
          <Form.Stack>
            <Field
              name="foods"
              label="Food"
              accepter={CustomSelect}
              options={options}
              error={formError.foods}
            />
          </Form.Stack>

          <hr />
          <ButtonToolbar>
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
