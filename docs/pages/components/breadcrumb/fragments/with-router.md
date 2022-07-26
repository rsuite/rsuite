<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';

const NavLink = React.forwardRef((props, ref) => {
  const { href, as, children, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

const App = () => (
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
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
