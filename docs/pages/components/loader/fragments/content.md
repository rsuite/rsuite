<!--start-code-->

```js
import { Loader } from 'rsuite';

const App = () => (
  <>
    <Loader content="Horizontal Loading..." />
    <hr />
    <Loader content="Vertical Loading..." vertical />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
