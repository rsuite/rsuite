### 与 Router 中的 Link 组合

<!--start-code-->

```js
const NavLink = props => (
  <Nav.Item componentClass={Link} {...props} />
);

const instance = (
  <Nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/guide/introduction">Guide</NavLink>
    <NavLink to="/components/overview">Components</NavLink>
    <NavLink to="/tools/palette">Tools</NavLink>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
