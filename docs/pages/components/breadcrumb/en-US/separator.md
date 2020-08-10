### Custom separator

<!--start-code-->

```js
const MyBreadcrumb = ({ separator }) => (
  <Breadcrumb separator={separator}>
    <Breadcrumb.Item as={Link} href="/">
      Home
    </Breadcrumb.Item>
    <Breadcrumb.Item as={Link} href="/components/overview">
      Components
    </Breadcrumb.Item>
    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
);

const instance = (
  <div>
    <MyBreadcrumb separator={'-'} />
    <MyBreadcrumb separator={'>'} />
    <MyBreadcrumb separator={<Icon icon="angle-right" />} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
