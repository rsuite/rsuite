<!--start-code-->

```js
import { Dropdown, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import PageIcon from '@rsuite/icons/Page';
import IdInfoIcon from '@rsuite/icons/IdInfo';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

const renderIconButton = (props, ref) => {
  return (
    <IconButton {...props} ref={ref} icon={<PlusIcon />} circle color="blue" appearance="primary" />
  );
};

const renderButton = (props, ref) => {
  return (
    <button {...props} ref={ref}>
      New File
    </button>
  );
};

const App = () => (
  <>
    <Dropdown renderToggle={renderIconButton}>
      <Dropdown.Item icon={<PageIcon />}>New File</Dropdown.Item>
      <Dropdown.Item icon={<IdInfoIcon />}>New File with Current Profile</Dropdown.Item>
      <Dropdown.Item icon={<FileDownloadIcon />}>Download As...</Dropdown.Item>
      <Dropdown.Item icon={<DetailIcon />}>Export PDF</Dropdown.Item>
    </Dropdown>
    <hr />
    <Dropdown renderToggle={renderButton}>
      <Dropdown.Item icon={<PageIcon />}>New File</Dropdown.Item>
      <Dropdown.Item icon={<IdInfoIcon />}>New File with Current Profile</Dropdown.Item>
      <Dropdown.Item icon={<FileDownloadIcon />}>Download As...</Dropdown.Item>
      <Dropdown.Item icon={<DetailIcon />}>Export PDF</Dropdown.Item>
    </Dropdown>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
