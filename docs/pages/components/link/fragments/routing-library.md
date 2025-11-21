<!--start-code-->

```js
import { Link } from 'rsuite';
import NextLink from 'next/link';

const App = () => {
  return (
    <Link as={NextLink} href="/">
      Next Link
    </Link>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
