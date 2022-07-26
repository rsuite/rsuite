<!--start-code-->

```js
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

const App = () => (
  <div className="show-container">
    <Container>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Container>

    <Container>
      <Sidebar>Sidebar</Sidebar>
      <Container>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Container>
    </Container>

    <Container>
      <Header>Header</Header>
      <Container>
        <Sidebar>Sidebar</Sidebar>
        <Content>Content</Content>
      </Container>
      <Footer>Footer</Footer>
    </Container>

    <Container>
      <Header>Header</Header>
      <Container>
        <Content>Content</Content>
        <Sidebar>Sidebar</Sidebar>
      </Container>
      <Footer>Footer</Footer>
    </Container>
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
