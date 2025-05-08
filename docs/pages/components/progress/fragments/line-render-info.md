<!--start-code-->

```jsx
import { Progress, VStack, HStack } from 'rsuite';
import { FaCheckCircle } from 'react-icons/fa';

const App = () => (
  <VStack spacing={20}>
    <Progress
      percent={100}
      status="success"
      renderInfo={(percent, status) => (
        <span
          style={{
            color: status === 'success' ? '#4CAF50' : '#000'
          }}
        >
          {status === 'success' ? 'Completed!' : `${percent}%`}
        </span>
      )}
    />

    <Progress
      percent={100}
      renderInfo={percent => (
        <HStack>
          <FaCheckCircle color="#4CAF50" />
          <span>{percent}% Done</span>
        </HStack>
      )}
    />

    <Progress
      percent={60}
      percentPlacement="insideCenter"
      strokeWidth={20}
      radius={10}
      renderInfo={percent => `Current progress: ${percent}%`}
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
