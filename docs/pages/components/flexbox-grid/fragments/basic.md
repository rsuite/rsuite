<!--start-code-->

```js
import { FlexboxGrid } from 'rsuite';

const App = () => (
  <div className="show-grid">
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
