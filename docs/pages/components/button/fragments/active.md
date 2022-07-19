<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Button appearance="default" active>
      Default
    </Button>
    <Button appearance="primary" active>
      Primary
    </Button>
    <Button appearance="link" active>
      Link
    </Button>
    <Button appearance="subtle" active>
      Subtle
    </Button>
    <Button appearance="ghost" active>
      Ghost
    </Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
