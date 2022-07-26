<!--start-code-->

```js
import { Tooltip, Whisper, Button } from 'rsuite';

const App = () => (
  <Whisper followCursor speaker={<Tooltip>This is a Tooltip that follow cursor</Tooltip>}>
    <Button>Hover me</Button>
  </Whisper>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
