<!--start-code-->

```js
import { Slider } from 'rsuite';

const App = () => (
  <>
    <Slider style={{ width: 200 }} />
    <hr />
    <Slider style={{ height: 200 }} vertical />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
