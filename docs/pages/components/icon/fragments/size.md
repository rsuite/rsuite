<!--start-code-->

```js
import { HStack } from 'rsuite';
import PieChartIcon from '@rsuite/icons/PieChart';

const App = () => (
  <HStack spacing={20}>
    <PieChartIcon style={{ fontSize: '1rem' }} />
    <PieChartIcon style={{ fontSize: '2rem' }} />
    <PieChartIcon style={{ fontSize: '3rem' }} />
    <PieChartIcon style={{ fontSize: '4rem' }} />
    <PieChartIcon style={{ fontSize: '5rem' }} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
