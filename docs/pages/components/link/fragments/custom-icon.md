<!--start-code-->

```js
import { Link, HStack } from 'rsuite';
import { RiExternalLinkLine, RiLink } from 'react-icons/ri';

const App = () => {
  return (
    <HStack spacing={20}>
      <Link href="https://rsuitejs.com" showAnchorIcon anchorIcon={<RiExternalLinkLine />}>
        External Link
      </Link>
      <Link href="https://rsuitejs.com" showAnchorIcon anchorIcon={<RiLink />}>
        Default Link
      </Link>
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
