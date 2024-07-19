<!--start-code-->

```js
import { Button, IconButton, ButtonToolbar } from 'rsuite';
import { FaGithub } from 'react-icons/fa';

const App = () => (
  <ButtonToolbar>
    <Button appearance="default" block>
      Block
    </Button>
    <Button appearance="primary" block>
      Block
    </Button>
    <Button block startIcon={<FaGithub />}>
      Github
    </Button>
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
