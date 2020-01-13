### Used with `Link` in `react-router`

<!--start-code-->

```js
const NavLink = props => <Dropdown.Item componentClass={Link} {...props} />;

const instance = (
  <Dropdown title="Menu">
    <NavLink href="/en/guide/introduction">
      <a>Guide</a>
    </NavLink>
    <NavLink href="/en/components/overview">
      <a>Components</a>
    </NavLink>
    <NavLink href="/en/tools/palette">
      <a>Tools</a>
    </NavLink>
  </Dropdown>
);
ReactDOM.render(instance);
```

<!--end-code-->
