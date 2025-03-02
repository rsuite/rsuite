<!--start-code-->

```js
import { Divider } from 'rsuite';

const App = () => (
  <>
    <Divider size="xs" label="xs" />
    <Divider size="sm" label="sm" />
    <Divider size="md" label="md" />
    <Divider size="lg" label="lg" />
    <Divider size={6} label={6} />
    <Divider size="0.5rem" label="0.5rem" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
