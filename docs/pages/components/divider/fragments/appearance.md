<!--start-code-->

```js
import { Divider } from 'rsuite';

const App = () => (
  <>
    <Divider spacing="md" label="Solid(default)" />
    <Divider spacing="md" appearance="dashed" label="Dashed" />
    <Divider spacing="md" appearance="dotted" label="Dotted" />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
