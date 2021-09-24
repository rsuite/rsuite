<!--start-code-->

```js
const { StringType, NumberType } = Schema.Types;

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

const model = Schema.Model({
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
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Group controlId="name-2">
            <Form.ControlLabel>Username </Form.ControlLabel>
            <Form.Control checkAsync name="name" placeholder="Please enter abc" />
          </Form.Group>

          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
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
