<!--start-code-->

```js
import { Kbd, HStack } from 'rsuite';

const App = () => (
  <HStack>
    <Kbd>⌘</Kbd>
    <Kbd>⌥</Kbd>
    <Kbd>⇧</Kbd>
    <Kbd>⌃</Kbd>
    <Kbd>F12</Kbd>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
