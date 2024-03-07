<!--start-code-->

```js
import { InlineEdit, DatePicker } from 'rsuite';

const App = () => (
  <InlineEdit placeholder="Click to edit ..." defaultValue={new Date()}>
    <DatePicker format="MMMM dd, yyyy" />
  </InlineEdit>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
