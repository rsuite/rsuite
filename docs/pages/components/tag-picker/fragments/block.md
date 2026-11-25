<!--start-code-->

```js
import { TagPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);
const App = () => (
  <>
    <TagPicker data={data} block />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
