<!--start-code-->

```jsx
import { ProgressCircle, HStack, VStack, Text } from 'rsuite';
import { FaCheckCircle } from 'react-icons/fa';

const App = () => (
  <HStack spacing={20}>
    <ProgressCircle percent={30} w={100} renderInfo={percent => `Usage`} />

    <ProgressCircle
      percent={60}
      w={100}
      renderInfo={percent => (
        <VStack align="center">
          <Text>Usage</Text>
          <Text>{percent}%</Text>
        </VStack>
      )}
    />

    <ProgressCircle
      percent={100}
      w={100}
      status="success"
      renderInfo={(percent, status) => (
        <span
          style={{
            color: status === 'success' ? '#4CAF50' : '#000'
          }}
        >
          {status === 'success' ? <FaCheckCircle size="30" color="#4CAF50" /> : `${percent}%`}
        </span>
      )}
    />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
