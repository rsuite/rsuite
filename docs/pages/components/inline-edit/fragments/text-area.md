<!--start-code-->

```js
import { InlineEdit, Input } from 'rsuite';

const App = () => (
  <>
    <InlineEdit placeholder="Click to edit ...">
      {(props, ref) => {
        return <Input as="textarea" ref={ref} {...props} style={{ width: 300 }} rows={5} />;
      }}
    </InlineEdit>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
