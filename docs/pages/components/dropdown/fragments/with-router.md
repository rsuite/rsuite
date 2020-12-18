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
  <Dropdown title="Menu">
    <Dropdown.Item as={MyLink} href="/guide/introduction">
      Guide
    </Dropdown.Item>
    <Dropdown.Item as={MyLink} href="/components/overview">
      Components
    </Dropdown.Item>
    <Dropdown.Item as={MyLink} href="/tools/palette">
      Tools
    </Dropdown.Item>
  </Dropdown>
);
ReactDOM.render(instance);
```

<!--end-code-->
