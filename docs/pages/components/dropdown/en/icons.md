### Dropdown with Icon

<!--start-code-->

```js
const instance = (
  <Dropdown title="File" icon={<Icon icon="file" />}>
    <Dropdown.Item icon={<Icon icon="file" />}>New File</Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="file-o" />}>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="cloud-download" />}>Download As...</Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="file-pdf-o" />}>Export PDF</Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="html5" />}>Export HTML</Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="cog" />}>Settings</Dropdown.Item>
    <Dropdown.Item icon={<Icon icon="info" />}>About</Dropdown.Item>
  </Dropdown>
);
ReactDOM.render(instance);
```

<!--end-code-->
