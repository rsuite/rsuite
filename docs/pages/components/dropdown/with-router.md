### 与 `next/link` 组合

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

const NavLink = props => <Dropdown.Item componentClass={MyLink} {...props} />;

const instance = (
  <Dropdown title="Menu">
    <NavLink href="/guide/introduction">Guide</NavLink>
    <NavLink href="/components/overview">Components</NavLink>
    <NavLink href="/tools/palette">Tools</NavLink>
  </Dropdown>
);
ReactDOM.render(instance);
```

<!--end-code-->
