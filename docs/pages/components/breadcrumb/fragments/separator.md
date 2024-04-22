<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

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
