<!--start-code-->

```js
import { Loader } from 'rsuite';

const App = () => (
  <>
    <Loader size="xs" content="Xsmall" />
    <hr />
    <Loader size="sm" content="Small" />
    <hr />
    <Loader size="md" content="Medium" />
    <hr />
    <Loader size="lg" content="Large" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
