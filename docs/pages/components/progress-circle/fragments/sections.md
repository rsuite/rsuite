<!--start-code-->

```jsx
import { ProgressCircle, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={24}>
    <ProgressCircle
      strokeWidth={8}
      w={100}
      strokeLinecap="square"
      sections={[
        { percent: 30, color: '#f7635c' },
        { percent: 40, color: '#409af5' },
        { percent: 20, color: '#28a745' }
      ]}
    />

    <ProgressCircle
      strokeWidth={8}
      gapDegree={90}
      gapPosition="bottom"
      w={100}
      sections={[
        { percent: 25, color: '#f7635c' },
        { percent: 25, color: '#f08800' },
        { percent: 25, color: '#409af5' },
        { percent: 25, color: '#28a745' }
      ]}
    />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
