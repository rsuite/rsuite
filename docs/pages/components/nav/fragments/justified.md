<!--start-code-->

```js
import { Nav } from 'rsuite';

const App = () => (
  <>
    <Nav justified defaultActiveKey="Home">
      <Nav.Item eventKey="Home">Home</Nav.Item>
      <Nav.Item eventKey="News">News</Nav.Item>
      <Nav.Item eventKey="Solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="Products">Products</Nav.Item>
      <Nav.Item eventKey="About">About</Nav.Item>
    </Nav>
    <br />
    <Nav appearance="tabs" justified defaultActiveKey="Home">
      <Nav.Item eventKey="Home">Home</Nav.Item>
      <Nav.Item eventKey="News">News</Nav.Item>
      <Nav.Item eventKey="Solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="Products">Products</Nav.Item>
      <Nav.Item eventKey="About">About</Nav.Item>
    </Nav>
    <br />
    <Nav appearance="subtle" justified defaultActiveKey="Home">
      <Nav.Item eventKey="Home">Home</Nav.Item>
      <Nav.Item eventKey="News">News</Nav.Item>
      <Nav.Item eventKey="Solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="Products">Products</Nav.Item>
      <Nav.Item eventKey="About">About</Nav.Item>
    </Nav>

    <br />
    <Nav appearance="pills" justified defaultActiveKey="Home">
      <Nav.Item eventKey="Home">Home</Nav.Item>
      <Nav.Item eventKey="News">News</Nav.Item>
      <Nav.Item eventKey="Solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="Products">Products</Nav.Item>
      <Nav.Item eventKey="About">About</Nav.Item>
    </Nav>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
