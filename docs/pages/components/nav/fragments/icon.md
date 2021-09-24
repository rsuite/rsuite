<!--start-code-->

```js
const instance = (
  <Nav>
    <Nav.Item icon={<FacebookSquare />}>facebook</Nav.Item>
    <Nav.Item icon={<GithubAlt />}>github</Nav.Item>
    <Nav.Item icon={<Circle />}>amazon</Nav.Item>
    <Nav.Item icon={<Chrome />}>chrome</Nav.Item>
    <Nav.Dropdown icon={<EllipsisH />} title="more...">
      <Nav.Dropdown.Item icon={<Dropbox />}>dropbox</Nav.Dropdown.Item>
      <Nav.Dropdown.Item icon={<Firefox />}>firefox</Nav.Dropdown.Item>
      <Nav.Dropdown.Item icon={<Gitlab />}>gitlab</Nav.Dropdown.Item>
      <Nav.Dropdown.Item icon={<Linux />}>linux</Nav.Dropdown.Item>
    </Nav.Dropdown>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
