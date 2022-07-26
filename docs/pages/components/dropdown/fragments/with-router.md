<!--start-code-->

```js
import { Dropdown } from 'rsuite';
import Link from 'next/link';

const MyLink = React.forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const App = () => (
  <Dropdown title="Menu">
    <Dropdown.Item as={MyLink} href="/guide/introduction">
      Guide
    </Dropdown.Item>
    <Dropdown.Item as={MyLink} href="/components/overview">
      Components
    </Dropdown.Item>
    <Dropdown.Item as={MyLink} href="/resources/palette">
      Resources
    </Dropdown.Item>
  </Dropdown>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
