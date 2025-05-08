<!--start-code-->

```js
import { ProgressCircle, VStack, HStack } from 'rsuite';

const App = () => (
  <VStack spacing={20} alignItems="flex-start">
    <HStack spacing={20}>
      <ProgressCircle percent={30} gapDegree={70} gapPosition="top" w={100} />
      <ProgressCircle percent={30} gapDegree={70} gapPosition="right" w={100} />
      <ProgressCircle percent={30} gapDegree={70} gapPosition="bottom" w={100} />
      <ProgressCircle percent={30} gapDegree={70} gapPosition="left" w={100} />
    </HStack>
    <HStack spacing={20}>
      <ProgressCircle percent={30} gapDegree={0} w={100} />
      <ProgressCircle percent={30} gapDegree={90} w={100} />
      <ProgressCircle percent={30} gapDegree={180} w={100} />
      <ProgressCircle percent={30} gapDegree={270} w={100} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
