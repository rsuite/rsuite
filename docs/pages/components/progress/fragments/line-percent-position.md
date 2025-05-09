<!--start-code-->

```js
import { Progress, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <Progress percent={30} percentPlacement="start" />
    <Progress percent={30} percentPlacement="end" />
    <Progress percent={30} percentPlacement="insideStart" strokeWidth={20} radius={10} />
    <Progress percent={30} percentPlacement="insideEnd" strokeWidth={20} radius={10} />
    <Progress percent={30} percentPlacement="insideCenter" strokeWidth={20} radius={10} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
