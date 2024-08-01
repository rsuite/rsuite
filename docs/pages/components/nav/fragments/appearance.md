<!--start-code-->

```js
import { Nav, VStack } from 'rsuite';

const Navbar = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect}>
      <Nav.Item eventKey="home">Home</Nav.Item>
      <Nav.Item eventKey="news">News</Nav.Item>
      <Nav.Item eventKey="solutions">Solutions</Nav.Item>
      <Nav.Item eventKey="products">Products</Nav.Item>
      <Nav.Item eventKey="about">About</Nav.Item>
    </Nav>
  );
};

const App = () => {
  const [active, setActive] = React.useState('home');

  return (
    <VStack spacing={30}>
      <Navbar active={active} onSelect={setActive} />
      <Navbar appearance="tabs" active={active} onSelect={setActive} />
      <Navbar appearance="subtle" active={active} onSelect={setActive} />
      <Navbar appearance="pills" active={active} onSelect={setActive} />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
