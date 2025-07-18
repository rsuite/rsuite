<!--start-code-->

```js
import { Tooltip, Popover, Whisper, Button, ButtonToolbar } from 'rsuite';

const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i> .
  </Tooltip>
);

const App = () => (
  <ButtonToolbar>
    <Whisper
      placement="top"
      trigger="click"
      speaker={
        <Tooltip>
          This is a help <i>tooltip</i> .
        </Tooltip>
      }
    >
      <Button>Tooltip</Button>
    </Whisper>
    <Whisper
      placement="top"
      trigger="click"
      speaker={
        <Popover title="Popover">
          This is a help <i>popover</i> .
        </Popover>
      }
    >
      <Button>Popover</Button>
    </Whisper>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
