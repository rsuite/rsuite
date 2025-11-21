<!--start-code-->

```js
import { Divider, Placeholder, Button } from 'rsuite';

const App = () => (
  <>
    <Divider spacing="md" label="Label (start)" labelPlacement="start" />
    <Divider spacing="md" label="Label (center)" labelPlacement="center" />
    <Divider spacing="md" label="Label (end)" labelPlacement="end" />
    <Divider spacing="md" label={<Button>Button</Button>} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
