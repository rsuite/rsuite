<!--start-code-->

```js
import { Menu } from 'rsuite';
import { PageIcon, IdInfoIcon, FileDownloadIcon, DetailIcon } from '@rsuite/icons';

const MenuIcon = ({ as: Component }) => (
  <div
    style={{
      border: '1px solid var(--rs-divider-border)',
      padding: 6,
      borderRadius: 6
    }}
  >
    <Component
      color="#228be6"
      style={{
        width: 20,
        height: 20
      }}
    />
  </div>
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
