<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';

const App = () => (
  <ButtonToolbar>
    <Button startIcon={<PagePreviousIcon />}>Prev</Button>
    <ButtonGroup>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>5</Button>
    </ButtonGroup>
    <Button endIcon={<PageNextIcon />}>Next</Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
