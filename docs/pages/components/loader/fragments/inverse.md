<!--start-code-->

```js
import { Loader } from 'rsuite';

const App = () => (
  <div style={{ height: 200, background: '#000' }}>
    <Loader inverse center content="loading..." />
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
