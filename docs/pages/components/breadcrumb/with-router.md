### 与 Router 中的 Link 组合

<!--start-code-->

```js
const NavLink = props => <Breadcrumb.Item componentClass={Link} {...props} />;

const instance = (
  <Breadcrumb>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/components/overview">Components</NavLink>
    <NavLink active>Breadcrumb</NavLink>
  </Breadcrumb>
);
ReactDOM.render(instance);
```

<!--end-code-->
