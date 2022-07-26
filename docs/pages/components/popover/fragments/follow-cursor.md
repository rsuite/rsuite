<!--start-code-->

```js
import { Popover, Whisper, Button } from 'rsuite';

const App = () => (
  <Whisper followCursor speaker={<Popover>This is a Popover that follow cursor</Popover>}>
    <Button>Hover me</Button>
  </Whisper>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
