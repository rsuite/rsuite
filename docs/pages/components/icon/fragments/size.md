<!--start-code-->

```js
import { HStack } from 'rsuite';
import PieChartIcon from '@rsuite/icons/PieChart';

const ChartIcon = ({ size }) => <PieChartIcon style={{ fontSize: size, marginRight: 10 }} />;

const App = () => (
  <HStack spacing={10}>
    <ChartIcon size="1em" />
    <ChartIcon size="2em" />
    <ChartIcon size="3em" />
    <ChartIcon size="4em" />
    <ChartIcon size="5em" />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
