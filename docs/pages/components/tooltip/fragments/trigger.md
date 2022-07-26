<!--start-code-->

```js
import { Tooltip, Whisper, Button, ButtonToolbar } from 'rsuite';

const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i> .
  </Tooltip>
);

const App = () => (
  <ButtonToolbar>
    <Whisper placement="top" controlId="control-id-click" trigger="click" speaker={tooltip}>
      <Button>Click</Button>
    </Whisper>
    <Whisper
      placement="top"
      controlId="control-id-context-menu"
      trigger="contextMenu"
      speaker={tooltip}
    >
      <Button>ContextMenu</Button>
    </Whisper>
    <Whisper placement="top" controlId="control-id-focus" trigger="focus" speaker={tooltip}>
      <Button>Focus</Button>
    </Whisper>
    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
      <Button>Hover</Button>
    </Whisper>
    <Whisper placement="top" controlId="control-id-active" trigger="active" speaker={tooltip}>
      <Button>Active</Button>
    </Whisper>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
