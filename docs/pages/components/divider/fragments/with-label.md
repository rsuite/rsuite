<!--start-code-->

```js
import { Divider, Placeholder, Button } from 'rsuite';

const App = () => (
  <>
    <Divider spacing="md" label="Label (left)" labelPosition="left" />
    <Divider spacing="md" label="Label (center)" labelPosition="center" />
    <Divider spacing="md" label="Label (right)" labelPosition="right" />
    <Divider spacing="md" label={<Button>Button</Button>} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
