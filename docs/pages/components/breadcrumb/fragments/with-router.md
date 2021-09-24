<!--start-code-->

```js
const NavLink = React.forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const instance = (
  <Breadcrumb>
    <Breadcrumb.Item as={NavLink} href="/">
      Home
    </Breadcrumb.Item>
    <Breadcrumb.Item as={NavLink} href="/components/overview">
      Components
    </Breadcrumb.Item>
    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
);
ReactDOM.render(instance);
```

<!--end-code-->
