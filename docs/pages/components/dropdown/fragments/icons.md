<!--start-code-->

```js
import { Dropdown } from 'rsuite';
import PageIcon from '@rsuite/icons/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

const App = () => (
  <Dropdown title="File" icon={<PageIcon />}>
    <Dropdown.Item icon={<PageIcon />}>New File</Dropdown.Item>
    <Dropdown.Item icon={<FolderFillIcon />}>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item icon={<FileDownloadIcon />}>Download As...</Dropdown.Item>
    <Dropdown.Item icon={<DetailIcon />}>Export PDF</Dropdown.Item>
  </Dropdown>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
