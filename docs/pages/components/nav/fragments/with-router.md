<!--start-code-->

```js
import { Nav } from 'rsuite';
import Link from 'next/link';

const App = () => (
  <Nav>
    <Nav.Item as={Link} href="/">
      Home
    </Nav.Item>
    <Nav.Item as={Link} href="/guide/introduction">
      Guide
    </Nav.Item>
    <Nav.Item as={Link} href="/components/overview">
      Components
    </Nav.Item>
    <Nav.Item as={Link} href="/resources/palette">
      Resources
    </Nav.Item>
  </Nav>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
