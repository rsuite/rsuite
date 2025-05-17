<!--start-code-->

```js
import { InlineEdit, Input } from 'rsuite';

const App = () => (
  <>
    <InlineEdit placeholder="Click to edit ..." w={300}>
      <Input as="textarea" rows={5} />
    </InlineEdit>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
