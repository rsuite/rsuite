<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import PageEndIcon from '@rsuite/icons/PageEnd';

const App = () => (
  <ButtonToolbar>
    <Button endIcon={<FaExternalLinkSquareAlt />}> Open on new tab </Button>
    <Button endIcon={<PageEndIcon />}> Next page </Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
