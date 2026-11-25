<!--start-code-->

```js
import { Dropdown } from 'rsuite';

const App = () => (
  <Dropdown title="Actions">
    <Dropdown.Item shortcut="⌘ C">Copy</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ X">Cut</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ V">Paste</Dropdown.Item>
    <Dropdown.Item shortcut="⌘ ⇧ V">Paste to replace</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Menu title="Find">
      <Dropdown.Item shortcut="⌘ F">Find...</Dropdown.Item>
      <Dropdown.Item shortcut="⌘ ⇧ F">Find and replace...</Dropdown.Item>
      <Dropdown.Item shortcut="⌘ G">Find next</Dropdown.Item>
      <Dropdown.Item shortcut="⌘ ⇧ G">Find previous</Dropdown.Item>
    </Dropdown.Menu>
    <Dropdown.Menu title="Selection">
      <Dropdown.Item shortcut="⌘ A">Select all</Dropdown.Item>
      <Dropdown.Item shortcut="⌘ ⇧ U">Soft undo</Dropdown.Item>
      <Dropdown.Item shortcut="⌘ ⇧ D">Duplicate selection</Dropdown.Item>
      <Dropdown.Item shortcut="⌘ L">Select line</Dropdown.Item>
      <Dropdown.Item shortcut="⌘ F3">Find all selections</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
