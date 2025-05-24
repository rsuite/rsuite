<!--start-code-->

```js
import { PasswordInput, VStack } from 'rsuite';

const App = () => (
  <VStack>
    <PasswordInput w={200} size="xs" placeholder="Xsmall" />
    <PasswordInput w={200} size="sm" placeholder="Small" />
    <PasswordInput w={200} size="md" placeholder="Medium" />
    <PasswordInput w={200} size="lg" placeholder="Large" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
