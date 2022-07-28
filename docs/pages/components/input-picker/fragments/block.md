<!--start-code-->

```js
import { InputPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <InputPicker data={data} block />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
