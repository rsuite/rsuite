<!--start-code-->

```js
import { Nav } from 'rsuite';
import Link from 'next/link';

const NavLink = React.forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const App = () => (
  <Nav>
    <Nav.Item as={NavLink} href="/">
      Home
    </Nav.Item>
    <Nav.Item as={NavLink} href="/guide/introduction">
      Guide
    </Nav.Item>
    <Nav.Item as={NavLink} href="/components/overview">
      Components
    </Nav.Item>
    <Nav.Item as={NavLink} href="/resources/palette">
      Resources
    </Nav.Item>
  </Nav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
