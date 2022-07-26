<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Button appearance="default" loading>
      Default
    </Button>
    <Button appearance="primary" loading>
      Primary
    </Button>
    <Button appearance="link" loading>
      Link
    </Button>
    <Button appearance="subtle" loading>
      Subtle
    </Button>
    <Button appearance="ghost" loading>
      Ghost
    </Button>
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
