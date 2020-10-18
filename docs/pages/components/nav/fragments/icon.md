
<!--start-code-->

```js
const instance = (
  <Nav>
    <Nav.Item icon={<Icon icon="facebook-square" />}>facebook</Nav.Item>
    <Nav.Item icon={<Icon icon="github-alt" />}>github</Nav.Item>
    <Nav.Item icon={<Icon icon="circle" />}>amazon</Nav.Item>
    <Nav.Item icon={<Icon icon="chrome" />}>chrome</Nav.Item>
    <Nav.Dropdown icon={<Icon icon="ellipsis-h" />} title="more...">
      <Nav.Dropdown.Item icon={<Icon icon="dropbox" />}>dropbox</Nav.Dropdown.Item>
      <Nav.Dropdown.Item icon={<Icon icon="firefox" />}>firefox</Nav.Dropdown.Item>
      <Nav.Dropdown.Item icon={<Icon icon="gitlab" />}>gitlab</Nav.Dropdown.Item>
      <Nav.Dropdown.Item icon={<Icon icon="linux" />}>linux</Nav.Dropdown.Item>
    </Nav.Dropdown>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
