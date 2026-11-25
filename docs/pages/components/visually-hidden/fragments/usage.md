<!--start-code-->

```js
import { VisuallyHidden, Button } from 'rsuite';
import { FaUniversalAccess } from 'react-icons/fa';

const App = () => (
  <Button>
    <VisuallyHidden>Universal Access</VisuallyHidden>
    <FaUniversalAccess />
  </Button>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
