<!--start-code-->

```js
import { Loader } from 'rsuite';

const App = () => (
  <>
    <Loader content="Loading..." />
    <hr />
    <Loader content="vertical Loading..." vertical />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
