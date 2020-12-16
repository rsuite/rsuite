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

const instance = (
  <Nav>
    <Nav.Item as={MyLink} href="/">
      Home
    </Nav.Item>
    <Nav.Item as={MyLink} href="/guide/introduction">
      Guide
    </Nav.Item>
    <Nav.Item as={MyLink} href="/components/overview">
      Components
    </Nav.Item>
    <Nav.Item as={MyLink} href="/tools/palette">
      Tools
    </Nav.Item>
  </Nav>
);
ReactDOM.render(instance);
```

<!--end-code-->
