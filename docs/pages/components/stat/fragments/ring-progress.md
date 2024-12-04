<!--start-code-->

```js
import { Stat, StatGroup, Progress, HStack, VStack } from 'rsuite';

const App = () => (
  <StatGroup spacing={20} columns={3}>
    <Stat bordered>
      <HStack spacing={16}>
        <Progress.Circle percent={50} width={50} strokeWidth={10} trailWidth={10} />
        <VStack>
          <Stat.Label>Processing</Stat.Label>
          <Stat.Value>1,200</Stat.Value>
        </VStack>
      </HStack>
    </Stat>

    <Stat bordered>
      <HStack spacing={16}>
        <Progress.Circle
          percent={10}
          width={50}
          strokeColor="#ffc107"
          strokeWidth={10}
          trailWidth={10}
        />
        <VStack>
          <Stat.Label>Pending</Stat.Label>
          <Stat.Value>100</Stat.Value>
        </VStack>
      </HStack>
    </Stat>

    <Stat bordered>
      <HStack spacing={16}>
        <Progress.Circle
          percent={45}
          width={50}
          strokeColor="#87d068"
          strokeWidth={10}
          trailWidth={10}
        />
        <VStack>
          <Stat.Label>Completed</Stat.Label>
          <Stat.Value>1,000</Stat.Value>
        </VStack>
      </HStack>
    </Stat>
  </StatGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
