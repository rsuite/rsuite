<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';

const App = () => (
  <ButtonToolbar>
    <Button appearance="default">Default</Button>
    <Button appearance="primary">Primary</Button>
    <Button appearance="link">Link</Button>
    <Button appearance="subtle">Subtle</Button>
    <Button appearance="ghost">Ghost</Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
