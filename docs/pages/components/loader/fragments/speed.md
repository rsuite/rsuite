<!--start-code-->

```js
import { Loader } from 'rsuite';

const App = () => (
  <>
    <Loader speed="fast" content="Fast" />
    <hr />
    <Loader speed="normal" content="Normal" />
    <hr />
    <Loader speed="slow" content="Slow" />
    <hr />
    <Loader speed="paused" content="Paused" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
