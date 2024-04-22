<!--start-code-->

```js
import { Dropdown } from 'rsuite';
import Link from 'next/link';

const App = () => (
  <Dropdown title="Menu">
    <Dropdown.Item as={Link} href="/guide/introduction">
      Guide
    </Dropdown.Item>
    <Dropdown.Item as={Link} href="/components/overview">
      Components
    </Dropdown.Item>
    <Dropdown.Item as={Link} href="/resources/palette">
      Resources
    </Dropdown.Item>
  </Dropdown>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
