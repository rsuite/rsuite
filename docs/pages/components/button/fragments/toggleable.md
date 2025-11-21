<!--start-code-->

```js
import { Button, ButtonGroup } from 'rsuite';

const App = () => (
  <ButtonGroup>
    <Button toggleable>Bold</Button>
    <Button toggleable>Italic</Button>
    <Button toggleable>Underline</Button>
  </ButtonGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
