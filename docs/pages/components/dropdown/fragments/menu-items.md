<!--start-code-->

```js
import { Dropdown, Text } from 'rsuite';

const { Menu, Item } = Dropdown;
const MenuIten = ({ children }) => {
  return (
    <Item>
      <Stack justifyContent="space-between">{children}</Stack>
    </Item>
  );
};

const App = () => (
  <Menu
    style={{
      width: 300,
      border: '1px solid #ddd'
    }}
  >
    <MenuIten>
      New File <Text as="kbd"> ⌘ + N</Text>
    </MenuIten>
    <MenuIten>
      New File with Current Profile
      <Text as="kbd"> ⌘ + Shift + N</Text>
    </MenuIten>
    <MenuIten>
      Download As...
      <Text as="kbd"> ⌘ + Shift + D</Text>
    </MenuIten>
    <MenuIten>
      Export PDF
      <Text as="kbd"> ⌘ + Shift + E</Text>
    </MenuIten>
    <MenuIten>
      Export HTML
      <Text as="kbd"> ⌘ + Shift + H</Text>
    </MenuIten>
    <MenuIten>
      Settings
      <Text as="kbd"> ⌘ + ,</Text>
    </MenuIten>
    <MenuIten>
      About
      <Text as="kbd"> ⌘ + Shift + ,</Text>
    </MenuIten>
  </Menu>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
