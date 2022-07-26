<!--start-code-->

```js
import PieChartIcon from '@rsuite/icons/PieChart';

const App = () => (
  <div className="icon-example-list">
    <PieChartIcon style={{ fontSize: '2em' }} />
    <PieChartIcon rotate={90} style={{ fontSize: '2em' }} />
    <PieChartIcon rotate={180} style={{ fontSize: '2em' }} />
    <PieChartIcon rotate={270} style={{ fontSize: '2em' }} />
    <PieChartIcon flip="horizontal" style={{ fontSize: '2em' }} />
    <PieChartIcon flip="vertical" style={{ fontSize: '2em' }} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
