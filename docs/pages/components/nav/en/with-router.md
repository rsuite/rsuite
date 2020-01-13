### Used with `Link` in `react-router`

<!--start-code-->

```js
const NavLink = props => <Nav.Item componentClass={Link} {...props} />;

const instance = (
  <Nav>
    <NavLink to="/en/">Home</NavLink>
    <NavLink to="/en/guide/introduction">Guide</NavLink>
    <NavLink to="/en/components/overview">Components</NavLink>
    <NavLink to="/en/tools/palette">Tools</NavLink>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
