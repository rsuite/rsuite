<!--start-code-->

```js
import { Divider, Placeholder, Button } from 'rsuite';

const App = () => (
  <>
    <Divider spacing="md" label="Label" labelPosition="left" />
    <Divider spacing="md" label="Label" />
    <Divider spacing="md" label="Label" labelPosition="right" />
    <Divider spacing="md" label={<Button>Label</Button>} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
