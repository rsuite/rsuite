<!--start-code-->

```js
import { ProgressCircle, VStack, HStack } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <HStack spacing={20}>
      <ProgressCircle
        percent={30}
        gapDegree={90}
        gapPosition="top"
        w={100}
        renderInfo={() => 'Top'}
      />
      <ProgressCircle
        percent={30}
        gapDegree={90}
        gapPosition="right"
        w={100}
        renderInfo={() => 'Right'}
      />
      <ProgressCircle
        percent={30}
        gapDegree={90}
        gapPosition="bottom"
        w={100}
        renderInfo={() => 'Bottom'}
      />
      <ProgressCircle
        percent={30}
        gapDegree={90}
        gapPosition="left"
        w={100}
        renderInfo={() => 'Left'}
      />
    </HStack>
    <HStack spacing={20}>
      <ProgressCircle percent={30} gapDegree={0} w={100} renderInfo={() => '0'} />
      <ProgressCircle percent={30} gapDegree={90} w={100} renderInfo={() => '90'} />
      <ProgressCircle percent={30} gapDegree={180} w={100} renderInfo={() => '180'} />
      <ProgressCircle percent={30} gapDegree={270} w={100} renderInfo={() => '270'} />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
