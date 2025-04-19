<!--start-code-->

```js
import { Form, Button, ButtonToolbar, Schema, PasswordInput, Panel } from 'rsuite';

const { StringType } = Schema.Types;
const model = Schema.Model({
  password: StringType().proxy(['confirmPassword']),
  confirmPassword: StringType().equalTo('password')
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}
function App() {
  return (
    <Form model={model}>
      <Form.Stack>
        <TextField name="password" label="Password" accepter={PasswordInput} />
        <TextField name="confirmPassword" label="ConfirmPassword" accepter={PasswordInput} />
      </Form.Stack>
      <ButtonToolbar mt={20}>
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </ButtonToolbar>
    </Form>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
