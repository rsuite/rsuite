<!--start-code-->

```js
import { DateRangePicker } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState([new Date('2017-02-01'), new Date('2017-05-20')]);

  return <DateRangePicker value={value} onChange={setValue} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
