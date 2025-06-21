<!--start-code-->

```js
import { Progress, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <Progress percent={30} strokeColor="#673ab7" />
    <Progress percent={30} strokeColor="linear-gradient(45deg, #4CAF50, #2196F3)" />

    <Progress
      percent={50}
      strokeColor="linear-gradient(45deg, #2196F3,rgb(149, 243, 33))"
      trailColor="#000"
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
