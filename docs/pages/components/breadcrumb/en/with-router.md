### Used with `Link` in `react-router`

<!--start-code-->

```js
const NavLink = props => <Breadcrumb.Item componentClass={Link} {...props} />;

const instance = (
  <Breadcrumb>
    <NavLink to="/en/">Home</NavLink>
    <NavLink to="/en/components/overview">Components</NavLink>
    <NavLink active>Breadcrumb</NavLink>
  </Breadcrumb>
);
ReactDOM.render(instance);
```

<!--end-code-->
