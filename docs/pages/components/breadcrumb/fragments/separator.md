<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

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

const App = () => (
  <>
    <MyBreadcrumb separator={'-'} />
    <MyBreadcrumb separator={'>'} />
    <MyBreadcrumb separator={<AngleRightIcon />} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
