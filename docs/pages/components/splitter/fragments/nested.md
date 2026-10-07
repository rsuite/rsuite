<!--start-code-->

```js
import { Splitter, Box } from 'rsuite';

const App = () => (
  <Splitter defaultSizes={[25, 75]} style={{ height: 280 }}>
    <Splitter.Panel minSize={15} aria-label="Navigation">
      <Box p={20}>Navigation</Box>
    </Splitter.Panel>
    <Splitter.Panel minSize={40} aria-label="Workspace">
      <Splitter orientation="vertical" defaultSizes={[65, 35]} style={{ height: '100%' }}>
        <Splitter.Panel minSize={25} aria-label="Editor">
          <Box p={20}>Editor</Box>
        </Splitter.Panel>
        <Splitter.Panel minSize={15} aria-label="Output">
          <Box p={20}>Output</Box>
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
