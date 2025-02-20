<!--start-code-->

```js
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';
import { Form, Button, HStack, InputGroup, Input } from 'rsuite';

const Password = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <InputGroup inside style={{ width: 200 }}>
      <Input type={visible ? 'text' : 'password'} {...props} ref={ref} />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <VisibleIcon /> : <EyeCloseIcon />}
      </InputGroup.Button>
    </InputGroup>
  );
});

const App = () => (
  <>
    <Form layout="inline">
      <Form.Group controlId="username-7">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <HStack>
          <Form.Control name="username" style={{ width: 200 }} />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </HStack>
      </Form.Group>

      <Form.Group controlId="password-7">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" autoComplete="off" accepter={Password} />
      </Form.Group>

      <Button appearance="primary">Login</Button>
    </Form>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
