<!--start-code-->

```js
import { Progress, HStack } from 'rsuite';

const App = () => (
  <HStack h={300} spacing={32} wrap>
    <Progress vertical />
    <Progress vertical percent={30} status="active" />
    <Progress vertical percent={50} status="fail" />
    <Progress vertical percent={100} status="success" />
    <Progress vertical percent={80} showInfo={false} />
    <Progress vertical percent={30} percentPlacement="start" />
    <Progress vertical percent={30} percentPlacement="end" />
    <Progress vertical percent={60} percentPlacement="insideStart" strokeWidth={20} radius={10} />
    <Progress vertical percent={60} percentPlacement="insideEnd" strokeWidth={20} radius={10} />
    <Progress vertical percent={60} percentPlacement="insideCenter" strokeWidth={20} radius={10} />
    <Progress
      vertical
      strokeWidth={20}
      radius={10}
      showInfo={false}
      sections={[
        { percent: 40, color: '#f7635c', label: 'Documents' },
        { percent: 30, color: '#f08800', label: 'Media' },
        { percent: 30, color: '#409af5', label: 'Applications' },
      ]}
    />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
