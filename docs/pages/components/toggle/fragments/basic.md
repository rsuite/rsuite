<!--start-code-->

```js
import { Toggle, HStack } from 'rsuite';

const App = () => (
  <HStack>
    <Toggle />
    <Toggle defaultChecked />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
