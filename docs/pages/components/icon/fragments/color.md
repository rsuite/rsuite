<!--start-code-->

```js
import PieChartIcon from '@rsuite/icons/PieChart';

const ChartIcon = ({ color }) => (
  <PieChartIcon style={{ color, marginRight: 10, fontSize: '2em' }} />
);

const App = () => (
  <div>
    <ChartIcon color="red" />
    <ChartIcon color="blueviolet" />
    <ChartIcon color="green" />
    <ChartIcon color="#3498FF" />
    <ChartIcon color="#f5a623" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
