<!--start-code-->

```js
import { FlexboxGrid, Col } from 'rsuite';

const App = () => (
  <div className="show-grid">
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item as={Col} colspan={24} md={6}>
        colspan={24} md={6}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} md={6}>
        colspan={24} md={6}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} md={6} smHidden>
        colspan={24} md={6} smHidden
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
