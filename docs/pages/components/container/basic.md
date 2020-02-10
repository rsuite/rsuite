### 基础布局

<!--start-code-->

```js
const instance = (
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
ReactDOM.render(instance);
```

<!--end-code-->
