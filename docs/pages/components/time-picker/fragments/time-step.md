<!--start-code-->

```js
import { TimePicker } from 'rsuite';

const App = () => (
  <>
    <TimePicker hideMinutes={minute => minute % 15 !== 0} editable={false} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
