<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Button>Prev</Button>
    <ButtonGroup>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>5</Button>
    </ButtonGroup>
    <Button>Next</Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
