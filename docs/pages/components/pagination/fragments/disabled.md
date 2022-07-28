<!--start-code-->

```js
import { Pagination } from 'rsuite';

const App = () => (
  <>
    <Pagination disabled total={100} limit={10} activePage={1} prev last next first />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
