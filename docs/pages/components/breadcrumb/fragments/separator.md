<!--start-code-->

```js
import Link from 'next/link';
import { Breadcrumb, VStack } from 'rsuite';
import { MdArrowRightAlt } from 'react-icons/md';

const BreadcrumbBox = ({ separator }) => (
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

const App = () => (
  <VStack spacing={20}>
    <BreadcrumbBox separator={'-'} />
    <BreadcrumbBox separator={'>'} />
    <BreadcrumbBox separator={<MdArrowRightAlt size={16} />} />
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
