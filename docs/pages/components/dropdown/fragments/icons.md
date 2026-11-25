<!--start-code-->

```js
import { Dropdown } from 'rsuite';
import PageIcon from '@rsuite/icons/Page';
import IdInfoIcon from '@rsuite/icons/IdInfo';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

const App = () => (
  <Dropdown title="File" icon={<PageIcon />}>
    <Dropdown.Item icon={<PageIcon />} shortcut="⌘ N">
      New File
    </Dropdown.Item>
    <Dropdown.Item icon={<IdInfoIcon />} shortcut="⌘ ⇧ N">
      New File with Current Profile
    </Dropdown.Item>
    <Dropdown.Item icon={<FileDownloadIcon />} shortcut="⌘ ⇧ S">
      Download As...
    </Dropdown.Item>
    <Dropdown.Item icon={<DetailIcon />} shortcut="⌘ P">
      Export PDF
    </Dropdown.Item>
  </Dropdown>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
