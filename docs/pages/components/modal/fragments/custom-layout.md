<!--start-code-->

```js
import {
  Modal,
  Button,
  ButtonToolbar,
  PasswordInput,
  Form,
  HStack,
  Text,
  Box,
  Image,
  IconButton,
  Link
} from 'rsuite';

import CloseIcon from '@rsuite/icons/Close';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    username: '',
    password: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log('Form submitted:', formValue);
    handleClose();
  };

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen}>Open Custom Modal</Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose} size="lg" bodyFill>
        <Modal.Body>
          <HStack align="normal">
            <Box
              bg="linear-gradient(135deg, #2c3e75 0%, #1a2850 100%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="50%"
            >
              <Image
                src="/images/react-suite.png"
                alt="Logo"
                height={120}
                filter="brightness(0) invert(1)"
              />
            </Box>

            <Box
              flex={1}
              p={50}
              minHeight={500}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <IconButton
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  cursor: 'pointer'
                }}
                icon={<CloseIcon />}
                appearance="subtle"
                aria-label="Close"
              />

              <div>
                <Text size="2xl" mb={4}>
                  Welcome back
                </Text>
                <Text muted mb={20}>
                  Sign in to continue.
                </Text>

                <Form fluid formValue={formValue} onChange={setFormValue}>
                  <Form.Group controlId="username">
                    <Form.ControlLabel>Username</Form.ControlLabel>
                    <Form.Control name="username" placeholder="Enter your username" size="lg" />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control
                      accepter={PasswordInput}
                      name="password"
                      placeholder="Enter your password"
                      size="lg"
                    />
                  </Form.Group>
                  <Button appearance="primary" block size="lg" onClick={handleSubmit} mt={20}>
                    Sign in
                  </Button>
                </Form>

                <HStack mt={20} justify="center">
                  <Text>Don&apos;t have an account?</Text>
                  <Link href="#">Create one</Link>
                </HStack>
              </div>
            </Box>
          </HStack>
        </Modal.Body>
      </Modal>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
