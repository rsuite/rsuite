<!--start-code-->

```js
import { Rate } from 'rsuite';

const App = () => (
  <>
    <div>
      <Rate defaultValue={1} size="xs" />
    </div>
    <div>
      <Rate defaultValue={2} size="sm" />
    </div>
    <div>
      <Rate defaultValue={3} size="md" />
    </div>
    <div>
      <Rate defaultValue={4} size="lg" />
    </div>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
