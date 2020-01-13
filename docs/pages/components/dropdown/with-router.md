### 与 Router 中的 Link 组合

<!--start-code-->

```js
const NavLink = props => <Dropdown.Item componentClass={Link} {...props} />;

const instance = (
  <Dropdown title="Menu">
    <NavLink href="/guide/introduction">
      <a>Guide</a>
    </NavLink>
    <NavLink href="/components/overview">
      <a>Components</a>
    </NavLink>
    <NavLink href="/tools/palette">
      <a>Tools</a>
    </NavLink>
  </Dropdown>
);
ReactDOM.render(instance);
```

<!--end-code-->
