<!--start-code-->

```js
import { Divider } from 'rsuite';

const App = () => (
  <>
    <Divider size="xs" />
    <Divider size="sm" />
    <Divider size="md" />
    <Divider size="lg" />
    <Divider size={6} />
    <Divider size="0.5rem" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
