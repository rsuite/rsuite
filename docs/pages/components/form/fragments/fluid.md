<!--start-code-->

```js
import { Form, ButtonToolbar, Button, Input, InputGroup, InputNumber, Textarea } from 'rsuite';

const FormField = ({ name, label, text, ...props }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} {...props} />
    {text && <Form.Text>{text}</Form.Text>}
  </Form.Group>
);

const InputGroupField = React.forwardRef((props, ref) => (
  <InputGroup inside>
    <Input {...props} ref={ref} />
    <InputGroup.Addon>
      <AvatarIcon />
    </InputGroup.Addon>
  </InputGroup>
));

const App = () => (
  <Form fluid>
    <FormField name="name" label="Username" text="Username is required" />
    <FormField name="email" label="Email" text="Email is required" type="email" />
    <FormField name="password" label="Password" type="password" autoComplete="off" />
    <FormField name="textarea" label="Textarea" accepter={Textarea} rows={5} />
    <FormField name="input-group" label="Input Group" accepter={InputGroupField} />
    <FormField name="numder" label="InputNumber" accepter={InputNumber} />
    <Form.Group>
      <ButtonToolbar>
        <Button appearance="primary">Submit</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </Form.Group>
  </Form>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
