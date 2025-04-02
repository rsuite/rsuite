<!--start-code-->

```js
import { Nav, SelectPicker } from 'rsuite';

const App = () => {
  const [active, setActive] = React.useState('home');
  const [appearance, setAppearance] = React.useState('default');

  return (
    <>
      <SelectPicker
        label="Appearance"
        searchable={false}
        cleanable={false}
        data={[
          { value: 'default', label: 'Default' },
          { value: 'tabs', label: 'Tabs' },
          { value: 'subtle', label: 'Subtle' },
          { value: 'pills', label: 'Pills' }
        ]}
        value={appearance}
        onChange={setAppearance}
      />
      <hr />
      <Nav vertical activeKey={active} onSelect={setActive} w={100} appearance={appearance}>
        <Nav.Item eventKey="home">Home</Nav.Item>
        <Nav.Item eventKey="products">Products</Nav.Item>
        <Nav.Item eventKey="services">Services</Nav.Item>
        <Nav.Item eventKey="contact">Contact Us</Nav.Item>
      </Nav>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
