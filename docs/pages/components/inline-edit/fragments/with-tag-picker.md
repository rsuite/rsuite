<!--start-code-->

```js
import { InlineEdit, TagPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <InlineEdit placeholder="Click to edit ..." style={{ width: 300 }}>
    {(props, ref) => {
      return <TagPicker {...props} ref={ref} data={data} block />;
    }}
  </InlineEdit>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
