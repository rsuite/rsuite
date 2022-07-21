<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(new Date());
  return <DatePicker style={{ width: 200 }} value={value} onChange={setValue} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
