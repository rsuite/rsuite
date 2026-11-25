<!--start-code-->

```js
import { Popover } from 'rsuite';

const App = () => (
  <div style={{ height: 100, position: 'relative' }}>
    <Popover title="Title" visible>
      <p>This is a default Popover </p>
      <p>Content</p>
    </Popover>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
