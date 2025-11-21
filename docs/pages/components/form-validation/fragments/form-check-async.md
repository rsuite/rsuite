<!--start-code-->

```js
import { Form, Button, ButtonToolbar, Row, Col } from 'rsuite';
import { SchemaModel, StringType } from 'rsuite/Schema';

function asyncCheckUsername(name) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (name === 'abc') {
        resolve(false);
      } else {
        resolve(true);
      }
    }, 500);
  });
}

const model = SchemaModel({
  name: StringType()
    .addRule((value, data) => {
      return asyncCheckUsername(value);
    }, 'Duplicate username')
    .isRequired('This field is required.')
});

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: ''
  });

  const handleSubmit = () => {
    formRef.current.checkAsync().then(result => {
      console.log(result);
    });
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
            <Form.Group controlId="name-2">
              <Form.Label>Username </Form.Label>
              <Form.Control checkAsync name="name" placeholder="Please enter abc" />
            </Form.Group>
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
