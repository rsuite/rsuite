<!--start-code-->

```js
import { FlexboxGrid } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <div>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
