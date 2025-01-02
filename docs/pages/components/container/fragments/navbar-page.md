<!--start-code-->

```js
import { Container, Header, Content, Footer, Navbar, Nav } from 'rsuite';
import FakeBrowser from '@/components/FakeBrowser';
import { FaCog } from 'react-icons/fa';

const App = () => (
  <FakeBrowser height={600}>
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Brand>Brand</Navbar.Brand>
          <Nav>
            <Nav.Item>Home</Nav.Item>
            <Nav.Item>News</Nav.Item>
            <Nav.Item>Products</Nav.Item>
            <Nav.Menu title="About">
              <Nav.Item>Company</Nav.Item>
              <Nav.Item>Team</Nav.Item>
              <Nav.Item>Contact</Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<FaCog />}>Settings</Nav.Item>
          </Nav>
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
