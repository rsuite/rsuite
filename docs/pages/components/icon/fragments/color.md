<!--start-code-->

```js
import { HStack } from 'rsuite';
import PieChartIcon from '@rsuite/icons/PieChart';

const ChartIcon = ({ color }) => (
  <PieChartIcon style={{ color, marginRight: 10, fontSize: '2em' }} />
);

const App = () => (
  <HStack spacing={10}>
    <ChartIcon color="red" />
    <ChartIcon color="blueviolet" />
    <ChartIcon color="green" />
    <ChartIcon color="#3498FF" />
    <ChartIcon color="#f5a623" />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
