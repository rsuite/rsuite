<!--start-code-->

```js
import { Dropdown, Box } from 'rsuite';
import PageIcon from '@rsuite/icons/Page';
import IdInfoIcon from '@rsuite/icons/IdInfo';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

const DropdownIcon = ({ as: Component }) => (
  <Box p={6} border="1px solid #eee" rounded={6}>
    <Component
      color="#228be6"
      style={{
        width: 20,
        height: 20
      }}
    />
  </Box>
);

const App = () => (
  <Dropdown title="File" icon={<PageIcon />}>
    <Dropdown.Item
      icon={<DropdownIcon as={PageIcon} />}
      shortcut="⌘ N"
      description="Create a new file"
    >
      New File
    </Dropdown.Item>
    <Dropdown.Item
      icon={<DropdownIcon as={IdInfoIcon} />}
      shortcut="⌘ ⇧ N"
      description="Create a new file with current profile"
    >
      New File with Current Profile
    </Dropdown.Item>
    <Dropdown.Item
      icon={<DropdownIcon as={FileDownloadIcon} />}
      shortcut="⌘ ⇧ S"
      description="Download the selected file as a word document"
    >
      Download As...
    </Dropdown.Item>
    <Dropdown.Item
      icon={<DropdownIcon as={DetailIcon} />}
      shortcut="⌘ P"
      description="Export the selected file as a PDF"
    >
      Export PDF
    </Dropdown.Item>
  </Dropdown>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
