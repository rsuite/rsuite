<!--start-code-->

```js
import { InlineEdit, InputPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <InlineEdit placeholder="Click to edit ..." showControls={false}>
    <InputPicker data={data} style={{ width: 200 }} />
  </InlineEdit>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
