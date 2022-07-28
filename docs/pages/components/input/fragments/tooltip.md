<!--start-code-->

```js
import { Input, Whisper, Tooltip } from 'rsuite';

const App = () => (
  <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
    <Input style={{ width: 300 }} placeholder="Default Input" />
  </Whisper>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
