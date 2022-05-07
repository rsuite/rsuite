<!--start-code-->

```javascript
const nameRule = Schema.Types.StringType().isRequired('This field is required.');
function UsernameField() {
  return (
    <Form.Group controlId="name">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" rule={nameRule} />
    </Form.Group>
  );
}

const emailRule = Schema.Types.StringType().isEmail('Please enter a valid email address.');
function EmailField() {
  return (
    <Form.Group controlId="email">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" rule={emailRule} />
    </Form.Group>
  );
}

function App() {
  return (
    <Form>
      <UsernameField />
      <EmailField />
      <Button appearance="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

ReactDOM.render(<App />);
```

<!--end-code-->
