<!--start-code-->

```js
import { FlexboxGrid } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <FlexboxGrid>
    <FlexboxGrid.Item colspan={4} order={4}>
      <DecorativeBox>order={4}</DecorativeBox>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={4} order={3}>
      <DecorativeBox>order={3}</DecorativeBox>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={4} order={2}>
      <DecorativeBox>order={2}</DecorativeBox>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={4} order={1}>
      <DecorativeBox>order={1}</DecorativeBox>
    </FlexboxGrid.Item>
  </FlexboxGrid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
