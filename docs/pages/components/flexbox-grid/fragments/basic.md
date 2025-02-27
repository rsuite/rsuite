<!--start-code-->

```js
import { FlexboxGrid } from 'rsuite';

const App = () => (
  <div>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={6}>
        <Box>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box>colspan={6}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
