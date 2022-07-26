<!--start-code-->

```js
import PieChartIcon from '@rsuite/icons/PieChart';

const ChartIcon = ({ size }) => <PieChartIcon style={{ fontSize: size, marginRight: 10 }} />;

const App = () => (
  <>
    <ChartIcon size="1em" />
    <ChartIcon size="2em" />
    <ChartIcon size="3em" />
    <ChartIcon size="4em" />
    <ChartIcon size="5em" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
