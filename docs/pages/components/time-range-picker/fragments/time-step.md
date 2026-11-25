<!--start-code-->

```js
import { TimeRangePicker } from 'rsuite';

const App = () => (
  <>
    <TimeRangePicker hideMinutes={minute => minute % 15 !== 0} editable={false} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
