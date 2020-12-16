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

const MyBreadcrumb = ({ separator }) => (
  <Breadcrumb separator={separator}>
    <Breadcrumb.Item as={NavLink} href="/">
      Home
    </Breadcrumb.Item>
    <Breadcrumb.Item as={NavLink} href="/components/overview">
      Components
    </Breadcrumb.Item>
    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
);

const instance = (
  <div>
    <MyBreadcrumb separator={'-'} />
    <MyBreadcrumb separator={'>'} />
    <MyBreadcrumb separator={<AngleRight />} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
