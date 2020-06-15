### Login Page Layout

<!--start-code-->

```js
const instance = (
  <div className="show-fake-browser login-page">
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <a className="navbar-brand logo">Brand</a>
          </Navbar.Header>
        </Navbar>
      </Header>
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Login</h3>} bordered>
              <Form fluid>
                <FormGroup>
                  <ControlLabel>Username or email address</ControlLabel>
                  <FormControl name="name" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl name="password" type="password" />
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button appearance="primary">Sign in</Button>
                    <Button appearance="link">Forgot password?</Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Footer>Footer</Footer>
    </Container>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
