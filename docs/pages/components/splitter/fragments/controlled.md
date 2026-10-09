<!--start-code-->

```js
import { Splitter, Box, Text } from 'rsuite';

const App = () => {
  const [sizes, setSizes] = React.useState([30, 70]);
  const [finished, setFinished] = React.useState(sizes);

  return (
    <>
      <Splitter sizes={sizes} onResize={setSizes} onResizeEnd={setFinished} style={{ height: 180 }}>
        <Splitter.Panel minSize={15} maxSize={60} aria-label="Navigation">
          <Box p={20}>Navigation</Box>
        </Splitter.Panel>
        <Splitter.Panel minSize={30} aria-label="Workspace">
          <Box p={20}>Workspace</Box>
        </Splitter.Panel>
      </Splitter>
      <Text mt={12}>Sizes: {sizes.map(size => `${size.toFixed(1)}%`).join(' / ')}</Text>
      <Text>Last resize: {finished.map(size => `${size.toFixed(1)}%`).join(' / ')}</Text>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
