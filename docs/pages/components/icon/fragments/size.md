<!--start-code-->

```js
import { HStack } from 'rsuite';
import PieChartIcon from '@rsuite/icons/PieChart';

const App = () => (
  <HStack spacing={20}>
    <PieChartIcon size="1rem" />
    <PieChartIcon size="2rem" />
    <PieChartIcon size="3rem" />
    <PieChartIcon size="4rem" />
    <PieChartIcon size="5rem" />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
