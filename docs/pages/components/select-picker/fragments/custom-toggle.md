### Use with the button

<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <SelectPicker data={data} groupBy="role" placeholder="Select User" toggleAs={Button} />
    <hr />
    <SelectPicker data={data} groupBy="role" block placeholder="Select User" toggleAs={Button} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
