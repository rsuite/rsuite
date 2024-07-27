<!--start-code-->

```js
import { Form, Button, ButtonToolbar, Schema, Panel } from 'rsuite';

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
      <TextField name="password" label="Password" />
      <TextField name="confirmPassword" label="ConfirmPassword" />
      <ButtonToolbar>
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
