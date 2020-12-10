<!--start-code-->

```js
// import PieChartIcon from '@rsuite/icons/PieChartIcon';

const ChartIcon = ({ size }) => <PieChartIcon style={{ fontSize: size, marginRight: 10 }} />;

const App = () => (
  <div>
    <ChartIcon size="1em" />
    <ChartIcon size="2em" />
    <ChartIcon size="3em" />
    <ChartIcon size="4em" />
    <ChartIcon size="5em" />
  </div>
);
ReactDOM.render(<App />);
```

<!--end-code-->
