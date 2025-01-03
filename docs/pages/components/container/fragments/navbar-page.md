<!--start-code-->

```js
import { Container, Header, Content, Footer, Navbar, Nav, Avatar, Text, HStack } from 'rsuite';
import { FaReact } from 'react-icons/fa';
import FakeBrowser from '@/components/FakeBrowser';

const App = () => (
  <FakeBrowser height={600}>
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Content>
            <Navbar.Brand href="#">
              <FaReact size={26} /> Brand
            </Navbar.Brand>
            <Nav>
              <Nav.Item>Docs</Nav.Item>
              <Nav.Item>Components</Nav.Item>
              <Nav.Item>Tools</Nav.Item>
            </Nav>
          </Navbar.Content>
          <HStack>
            <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
            <Text>John Doe</Text>
          </HStack>
        </Navbar>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Container>
  </FakeBrowser>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
