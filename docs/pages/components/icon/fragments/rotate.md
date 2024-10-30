<!--start-code-->

```js
import { HStack } from 'rsuite';
import PieChartIcon from '@rsuite/icons/PieChart';

const App = () => (
  <HStack spacing={10}>
    <PieChartIcon style={{ fontSize: '2em' }} />
    <PieChartIcon rotate={90} style={{ fontSize: '2em' }} />
    <PieChartIcon rotate={180} style={{ fontSize: '2em' }} />
    <PieChartIcon rotate={270} style={{ fontSize: '2em' }} />
    <PieChartIcon flip="horizontal" style={{ fontSize: '2em' }} />
    <PieChartIcon flip="vertical" style={{ fontSize: '2em' }} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
