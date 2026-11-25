<!--start-code-->

```js
import { Menu } from 'rsuite';
import { PageIcon, IdInfoIcon, FileDownloadIcon, DetailIcon } from '@rsuite/icons';

const App = () => (
  <Menu>
    <Menu.Item icon={<PageIcon />}>New File</Menu.Item>
    <Menu.Item icon={<IdInfoIcon />}>New File with Current Profile</Menu.Item>
    <Menu.Item icon={<FileDownloadIcon />}>Download As...</Menu.Item>
    <Menu.Item icon={<DetailIcon />}>Export PDF</Menu.Item>
  </Menu>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
