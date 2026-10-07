<!--start-code-->

```js
import { Splitter, Box } from 'rsuite';

const App = () => (
  <Splitter defaultSizes={[30, 70]} style={{ height: 200 }}>
    <Splitter.Panel minSize={15} maxSize={60} aria-label="Navigation">
      <Box p={20}>Navigation</Box>
    </Splitter.Panel>
    <Splitter.Panel minSize={30} aria-label="Workspace">
      <Box p={20}>Workspace</Box>
    </Splitter.Panel>
  </Splitter>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
