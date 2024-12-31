<!--start-code-->

```js
import { Navbar, Nav, Avatar, Badge, IconButton } from 'rsuite';
import { IoLogoReact, IoNotifications } from 'react-icons/io5';

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
      <Navbar.Content>
        <Badge content={6} shape="circle">
          <IconButton icon={<IoNotifications size={20} />} circle appearance="subtle" size="xs" />
        </Badge>
        <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
      </Navbar.Content>
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
