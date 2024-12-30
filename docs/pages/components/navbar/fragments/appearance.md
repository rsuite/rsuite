<!--start-code-->

```js
import { Navbar, Nav, Avatar } from 'rsuite';
import { IoLogoReact } from 'react-icons/fa';

const CustomNavbar = ({ appearance, onSelect, activeKey, ...props }) => {
  return (
    <Navbar appearance={appearance} {...props}>
      <Navbar.Content>
        <Navbar.Brand href="#">
          <IoLogoReact size={26} /> {appearance.toUpperCase()}
        </Navbar.Brand>
        <Nav>
          <Nav.Item>Docs</Nav.Item>
          <Nav.Item>Components</Nav.Item>
          <Nav.Item>Tools</Nav.Item>
        </Nav>
      </Navbar.Content>
      <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
    </Navbar>
  );
};

const App = () => {
  const [activeKey, setActiveKey] = React.useState(null);

  return (
    <>
      <CustomNavbar appearance="default" activeKey={activeKey} onSelect={setActiveKey} />
      <hr />
      <CustomNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />
      <hr />
      <CustomNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
