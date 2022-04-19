<!--start-code-->

```js
const instance = (
  <Nav>
    <Nav.Item icon={<FacebookSquare />}>facebook</Nav.Item>
    <Nav.Item icon={<GithubAlt />}>github</Nav.Item>
    <Nav.Item icon={<Circle />}>amazon</Nav.Item>
    <Nav.Item icon={<Chrome />}>chrome</Nav.Item>
    <Nav.Menu icon={<EllipsisH />} title="more...">
      <Nav.Item icon={<Dropbox />}>dropbox</Nav.Item>
      <Nav.Item icon={<Firefox />}>firefox</Nav.Item>
      <Nav.Item icon={<Gitlab />}>gitlab</Nav.Item>
      <Nav.Item icon={<Linux />}>linux</Nav.Item>
    </Nav.Menu>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
