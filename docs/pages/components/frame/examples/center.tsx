/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  Center,
  Form,
  Button,
  Navbar,
  Panel,
  Input,
  Stack,
  VStack,
  Divider,
  InputGroup
} from 'rsuite';
import { FaGithub, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { SiProtondb } from 'react-icons/si';

const Password = React.forwardRef((props: any, ref: React.RefObject<HTMLInputElement>) => {
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <InputGroup inside ref={ref} {...props}>
      <Input type={visible ? 'text' : 'password'} />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <FaRegEyeSlash /> : <FaRegEye />}
      </InputGroup.Button>
    </InputGroup>
  );
});

Password.displayName = 'Password';

const App = () => {
  return (
    <Container>
      <Header>
        <Navbar>
          <Navbar.Brand>
            <SiProtondb size={26} /> Brand
          </Navbar.Brand>
          <Button>Create account</Button>
        </Navbar>
      </Header>
      <Content p={20}>
        <Stack align="center" justify="center" h="100%">
          <Panel header="Sign in" bordered w={360}>
            <Form fluid>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" autoFocus={false} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
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
      <Footer>
        <Center p={10}>Copyright &copy; 2022-present React Suite.</Center>
      </Footer>
    </Container>
  );
};

// Use dynamic import with ssr disabled
export default dynamic(() => Promise.resolve(App), { ssr: false });
