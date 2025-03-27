<!--start-code-->

```js
import { Link, HStack } from 'rsuite';

const App = () => {
  return (
    <HStack spacing={20}>
      <Link href="https://rsuitejs.com" isExternal>
        External Link
      </Link>
      <Link href="https://rsuitejs.com" isExternal showAnchorIcon>
        External Link with Icon
      </Link>
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
