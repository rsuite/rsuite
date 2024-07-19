<!--start-code-->

```js
import {
  Container,
  Header,
  Content,
  Footer,
  Form,
  Button,
  Navbar,
  Panel,
  Input,
  Stack,
  VStack
} from 'rsuite';
import FakeBrowser from '@/components/FakeBrowser';
import { FaGithub, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Password = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <InputGroup inside ref={ref} {...props}>
      <Input type={visible ? 'text' : 'password'} />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <FaRegEye /> : <FaRegEyeSlash />}
      </InputGroup.Button>
    </InputGroup>
  );
});

const App = () => (
  <FakeBrowser height={800}>
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar>
      </Header>
      <Content>
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
          <Panel header="Sign in" bordered style={{ width: 400 }}>
            <Form fluid>
              <Form.Group>
                <Form.ControlLabel>Email address</Form.ControlLabel>
                <Form.Control name="name" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control name="password" autoComplete="off" accepter={Password} />
              </Form.Group>

              <VStack spacing={10}>
                <Button appearance="primary" block>
                  Sign in
                </Button>
                <a href="#">Forgot password?</a>
              </VStack>
            </Form>

            <Divider>OR</Divider>

            <Button endIcon={<FaGithub />} block href="https://github.com/rsuite/rsuite">
              Continue with Github
            </Button>
          </Panel>
        </Stack>
      </Content>
    </Container>
  </FakeBrowser>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
