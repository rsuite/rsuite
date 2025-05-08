<!--start-code-->

```js
import { ProgressCircle, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={20} alignItems="flex-start">
    <ProgressCircle percent={30} strokeWidth={4} w={100} />
    <ProgressCircle percent={30} strokeWidth={8} w={100} />
    <ProgressCircle percent={30} strokeWidth={12} w={100} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
