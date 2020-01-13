### Custom separator

<!--start-code-->

```js
const instance = (
  <div>
    <Breadcrumb separator={'-'}>
      <Breadcrumb.Item componentClass={Link} href="/">
        <a>Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item componentClass={Link}>
        <a>Components</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
    <Breadcrumb separator={'>'}>
      <Breadcrumb.Item componentClass={Link} href="/">
        <a>Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item componentClass={Link}>
        <a>Components</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>

    <Breadcrumb separator={<Icon icon="angle-right" />}>
      <Breadcrumb.Item componentClass={Link} href="/">
        <a>Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item componentClass={Link}>
        <a>Components</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
