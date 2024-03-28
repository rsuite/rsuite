<!--start-code-->

```js
import { Dropdown } from 'rsuite';

const minWidth = 120;
const App = () => (
  <Dropdown title="Dropdown" menuStyle={{ minWidth }}>
    <Dropdown.Item>Item 1</Dropdown.Item>
    <Dropdown.Menu title="Item 2" style={{ minWidth }}>
      <Dropdown.Menu title="Item 2-1">
        <Dropdown.Item>Item 2-1-1</Dropdown.Item>
        <Dropdown.Item>Item 2-1-2</Dropdown.Item>
        <Dropdown.Item>Item 2-1-3</Dropdown.Item>
      </Dropdown.Menu>
      <Dropdown.Item>Item 2-2</Dropdown.Item>
      <Dropdown.Item>Item 2-3</Dropdown.Item>
    </Dropdown.Menu>
    <Dropdown.Menu title="Item 3">
      <Dropdown.Menu title="Item 3-1">
        <Dropdown.Item>Item 3-1-1</Dropdown.Item>
        <Dropdown.Item>Item 3-1-2</Dropdown.Item>
        <Dropdown.Item>Item 3-1-3</Dropdown.Item>
      </Dropdown.Menu>
      <Dropdown.Item>Item 3-2</Dropdown.Item>
      <Dropdown.Item>Item 3-3</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
