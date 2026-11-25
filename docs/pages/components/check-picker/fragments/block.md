<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <CheckPicker data={data} block />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
