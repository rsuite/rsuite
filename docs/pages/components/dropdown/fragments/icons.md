<!--start-code-->

```js
const instance = (
  <Dropdown title="File" icon={<File />}>
    <Dropdown.Item icon={<File />}>New File</Dropdown.Item>
    <Dropdown.Item icon={<FileO />}>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item icon={<CloudDownload />}>Download As...</Dropdown.Item>
    <Dropdown.Item icon={<FilePdfO />}>Export PDF</Dropdown.Item>
    <Dropdown.Item icon={<Html5 />}>Export HTML</Dropdown.Item>
    <Dropdown.Item icon={<Cog />}>Settings</Dropdown.Item>
    <Dropdown.Item icon={<Info />}>About</Dropdown.Item>
  </Dropdown>
);
ReactDOM.render(instance);
```

<!--end-code-->
