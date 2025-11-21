<!--start-code-->

```js
import { Progress, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={10}>
    <Progress percent={30} strokeWidth={20} />

    <Progress percent={30} strokeWidth={20} radius={10}/>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
