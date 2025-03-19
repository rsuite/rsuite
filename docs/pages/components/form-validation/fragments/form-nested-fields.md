<!--start-code-->

```js
import { Form, Button, ButtonToolbar, Schema, Panel, Box, Row, Col } from 'rsuite';
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

const { StringType, ObjectType, NumberType, ArrayType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name is required.'),
  address: ObjectType().shape({
    city: StringType().isRequired('City is required.'),
    postCode: NumberType('Post Code must be a number').isRequired('Post Code is required.')
  }),
  skills: ArrayType().of(
    ObjectType().shape({
      name: StringType().isRequired('Skill name is required.')
    })
  )
});

const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const App = () => {
  const form = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: 'Tom',
    address: { city: '', postCode: '' },
    skills: [{ name: '' }, { name: '' }]
  });

  const handleSubmit = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  };

  return (
    <Row>
      <Col span={{ xs: 24, md: 12 }}>
        <Form
          nestedField
          ref={form}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Stack>
            <TextField name="name" label="Name" />
            <TextField name="address.city" label="City" />
            <TextField name="address.postCode" label="Post Code" />
            <TextField name="skills[0].name" label="Skill 1" />
            <TextField name="skills[1].name" label="Skill 2" />
          </Form.Stack>

          <ButtonToolbar mt={20}>
            <Button appearance="primary" onClick={handleSubmit}>
              Check
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
