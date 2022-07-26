<!--start-code-->

```js
import { FlexboxGrid } from 'rsuite';

const App = () => (
  <div className="show-grid">
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={4} order={4}>
        order={4}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} order={3}>
        order={3}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} order={2}>
        order={2}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} order={1}>
        order={1}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
