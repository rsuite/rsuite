<!--start-code-->

```js
const MyLink = React.forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const NavLink = props => <Nav.Item linkAs={MyLink} {...props} />;
const instance = (
  <Nav>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/guide/introduction">Guide</NavLink>
    <NavLink href="/components/overview">Components</NavLink>
    <NavLink href="/tools/palette">Tools</NavLink>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
