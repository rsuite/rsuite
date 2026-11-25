<!--start-code-->

```js
import { Nav } from 'rsuite';

const Navbar = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 50 }}>
      <Nav.Item eventKey="home">Home</Nav.Item>
      <Nav.Item eventKey="products">Products</Nav.Item>
      <Nav.Item eventKey="services">Services</Nav.Item>
      <Nav.Item eventKey="contact">Contact Us</Nav.Item>
    </Nav>
  );
};

const App = () => {
  const [active, setActive] = React.useState('home');

  return (
    <>
      <Navbar appearance="tabs" reversed active={active} onSelect={setActive} />
      <Navbar appearance="subtle" reversed active={active} onSelect={setActive} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
