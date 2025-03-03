<!--start-code-->

```js
import { FlexboxGrid, Divider } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <>
    <Divider>align="top"</Divider>
    <FlexboxGrid align="top">
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={60}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={80}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={100}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={120}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    <Divider>align="middle"</Divider>
    <FlexboxGrid align="middle">
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={60}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={80}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={100}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={120}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    <Divider>align="bottom"</Divider>
    <FlexboxGrid align="bottom">
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={60}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={80}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={100}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <DecorativeBox height={120}>colspan={6}</DecorativeBox>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
