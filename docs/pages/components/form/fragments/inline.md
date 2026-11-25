<!--start-code-->

```js
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';
import { Form, Button, HStack, InputGroup, Input, PasswordInput } from 'rsuite';

const App = () => (
  <>
    <Form layout="inline">
      <Form.Group controlId="username-7">
        <Form.Label>Username</Form.Label>
        <HStack>
          <Form.Control name="username" w={200} />
          <Form.Text tooltip>Required</Form.Text>
        </HStack>
      </Form.Group>

      <Form.Group controlId="password-7">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" autoComplete="off" accepter={PasswordInput} />
      </Form.Group>

      <Button appearance="primary">Login</Button>
    </Form>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
