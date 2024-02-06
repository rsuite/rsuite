<!--start-code-->

```js
import { InlineEdit, DatePicker } from 'rsuite';

const App = () => (
  <InlineEdit placeholder="Click to edit ..." defaultValue={new Date()}>
    {(props, ref) => {
      return <DatePicker format="MMMM dd, yyyy" {...props} ref={ref} />;
    }}
  </InlineEdit>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
