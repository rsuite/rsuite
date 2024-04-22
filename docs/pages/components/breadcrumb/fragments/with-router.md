<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';

const App = () => (
  <Breadcrumb>
    <Breadcrumb.Item as={Link} href="/">
      Home
    </Breadcrumb.Item>
    <Breadcrumb.Item as={Link} href="/components/overview">
      Components
    </Breadcrumb.Item>
    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
