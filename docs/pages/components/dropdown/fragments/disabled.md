<!--start-code-->

```js
import { Dropdown, ButtonToolbar } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Dropdown title="Disabled Dropdown" disabled>
      <Dropdown.Item>Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
    </Dropdown>

    <Dropdown title="Disabled Menu Item">
      <Dropdown.Item disabled>Disabled Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
    </Dropdown>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
