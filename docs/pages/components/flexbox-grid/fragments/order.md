<!--start-code-->

```js
import { FlexboxGrid } from 'rsuite';

const App = () => (
  <FlexboxGrid>
    <FlexboxGrid.Item colspan={4} order={4}>
      <Box>order={4}</Box>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={4} order={3}>
      <Box>order={3}</Box>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={4} order={2}>
      <Box>order={2}</Box>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={4} order={1}>
      <Box>order={1}</Box>
    </FlexboxGrid.Item>
  </FlexboxGrid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
