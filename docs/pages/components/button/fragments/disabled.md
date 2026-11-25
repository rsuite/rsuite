<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Button appearance="default" disabled>
      Default
    </Button>
    <Button appearance="primary" disabled>
      Primary
    </Button>
    <Button appearance="link" disabled href="https://rsuitejs.com">
      Link
    </Button>
    <Button appearance="subtle" disabled>
      Subtle
    </Button>
    <Button appearance="ghost" disabled>
      Ghost
    </Button>
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
