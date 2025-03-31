<!--start-code-->

```js
import { Nav, SelectPicker } from 'rsuite';

const App = () => {
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
      <Nav appearance={appearance}>
        <Nav.Item active>Active</Nav.Item>
        <Nav.Item disabled>Disabled</Nav.Item>
        <Nav.Item>Normal</Nav.Item>
      </Nav>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
