<!--start-code-->

```js
import { SegmentedControl, VStack } from 'rsuite';

const App = () => (
  <VStack spacing={20}>
    <SegmentedControl
      disabled
      defaultValue="list"
      data={[
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Kanban', value: 'kanban' }
      ]}
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
