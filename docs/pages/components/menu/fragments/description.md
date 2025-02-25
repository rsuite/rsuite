<!--start-code-->

```js
import { Menu } from 'rsuite';
import { PageIcon, IdInfoIcon, FileDownloadIcon, DetailIcon } from '@rsuite/icons';

const MenuIcon = ({ as: Component }) => (
  <Component
    style={{
      width: 24,
      height: 24
    }}
  />
);

const App = () => (
  <Menu>
    <Menu.Item icon={<MenuIcon as={PageIcon} />} shortcut="⌘ N" description="Create a new file">
      New File
    </Menu.Item>
    <Menu.Item
      icon={<MenuIcon as={IdInfoIcon} />}
      shortcut="⌘ ⇧ N"
      description="Create a new file with current profile"
    >
      New File with Current Profile
    </Menu.Item>
    <Menu.Item
      icon={<MenuIcon as={FileDownloadIcon} />}
      shortcut="⌘ ⇧ S"
      description="Download the selected file as a word document"
    >
      Download As...
    </Menu.Item>
    <Menu.Item
      icon={<MenuIcon as={DetailIcon} />}
      shortcut="⌘ P"
      description="Export the selected file as a PDF"
    >
      Export PDF
    </Menu.Item>
  </Menu>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
